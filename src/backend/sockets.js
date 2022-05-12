const socket = require("socket.io");

const Session = require("./models/session.model");
const Participant = require("./models/participant.model");

const {
  createChat,
  updateChat,
  getChatsByParticipantId,
} = require("./service/chats");
const {
  getSocketIds,
  updateParticipantSocketId,
  getAllParticipants,
  getParticipantNames,
  getParticipantBySocketId,
} = require("./service/participants");
const {
  deleteParticipant,
} = require("./database/participants");
const {
  getSessionByParticipantId,
  appendSessionParticipant,
  removeSessionParticipant,
} = require("./service/sessions");
const {
  deleteSession,
  getSession,
} = require("./database/sessions");

const getRoomName = (code) => "Room: " + code;

const getChatName = (code) => "Chat: " + code;

const getRoomParticipants = async (sessionId) => {
  const session = await Session.findById(sessionId).exec();
  const participants = [];
  for (const id of session.members) {
    const member = await Participant.findById(id).exec();
    participants.push(member);
  }
  return participants;
};

const setupSockets = (server) => {
  const io = socket(server);

  io.on("connection", (socket) => {
    console.log("made connection: " + socket.id);

    socket.on("joinRoom", async ({ sessionId, participantId, participantName, sessionCode }) => {
      try {
        await updateParticipantSocketId(participantId, socket.id);
        await appendSessionParticipant(sessionCode, participantId);

        const roomName = getRoomName(sessionId);
        socket.join(roomName);

        const participants = await getRoomParticipants(sessionId);
        const chats = await Promise.all(
          (
            await getChatsByParticipantId(participantId)
          ).map(async (chat) => ({
            members: await getParticipantNames(chat.members),
            sessionId,
            id: chat._id.toString(),
            content: chat.messages,
          }))
        );

        io.to(roomName).emit("updateParticipants", {
          participants,
          participantName,
        });
        io.to(socket.id).emit("updateChats", {
          chats,
        });
      } catch (e) {
        console.error(e);
      }
    });

    socket.on("disconnect", async () => {
      try {
        console.log("disconnected: " + socket.id);
        const participant = await getParticipantBySocketId(socket.id);
        if (!participant) return;
        const participantSession = await getSessionByParticipantId(
          participant.id.toString()
        );
        await removeSessionParticipant(
          participantSession.id.toString(),
          participant.id.toString()
        );
        participant.socketId = null;
        updateParticipantSocketId(participant.id.toString(), null);

        const session = await getSession(participantSession.sessionCode);
        console.log(session);
        if (session.members.length === 0) {
          deleteParticipant(participant.id.toString());
          deleteSession(participantSession.id.toString());
        }
        
        else {
          const participants = await getRoomParticipants(participantSession.id);
          const roomName = getRoomName(participantSession.id);
          io.to(roomName).emit("deleteParticipant", {
            participants,
            participant,
          });

          setTimeout(() => {
            if (participant.socketId === null) deleteParticipant(participant.id.toString());
          }, 10000);
        }
        
      } catch (e) {
        console.error(e);
      }
    });

    socket.on("createChat", async ({ members, sessionId, initialContent }) => {
      const memberNames = await getParticipantNames(members);
      const newChat = await createChat(members, sessionId, initialContent);
      const roomName = getChatName(newChat._id.toString());
      const clients = await getSocketIds(members);
      clients.forEach((client) => {
        io.sockets.sockets.get(client).join(roomName);
        io.to(client).emit("createdChat", {
          members: memberNames,
          sessionId,
          id: newChat._id.toString(),
          content: newChat.messages,
        });
      });
    });

    socket.on("updateChat", async ({ updateType, id, updateData }) => {
      await updateChat(id, updateType, updateData);
      const roomName = getChatName(id);
      io.in(roomName).emit("updatedChat", { updateType, updateData, id });
    });
  });
};

module.exports = { setupSockets };
