const socket = require("socket.io");

const Session = require("./models/session.model");
const Participant = require("./models/participant.model");

const { createChat, updateChat } = require("./service/chats");
const {
  getSocketIds,
  updateParticipantSocketId,
  getParticipantNames,
} = require("./service/participants");

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

    socket.on("joinRoom", async ({ sessionId, participantId }) => {
      await updateParticipantSocketId(participantId, socket.id);

      const roomName = getRoomName(sessionId);
      socket.join(roomName);

      const participants = await getRoomParticipants(sessionId);

      io.to(roomName).emit("updateParticipants", {
        participants,
      });
    });

    socket.on("disconnect", () => {
      console.log("disconnected: " + socket.id);
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
