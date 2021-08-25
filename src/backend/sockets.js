const socket = require("socket.io");

const Session = require("./models/session.model");
const Participant = require("./models/participant.model");

const { createChat, updateChat } = require("./service/chats");
const {
  getSocketIds,
  updateParticipantSocketId,
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
      const newChat = await createChat(members, sessionId, initialContent);

      const roomName = getChatName(newChat._id.toString());
      const memberSocketIds = await getSocketIds(members);
      const clients = io.sockets
        .clients(getRoomName(sessionId))
        .filter((client) => memberSocketIds.includes(client.id));

      clients.forEach((client) => {
        client.join(roomName);
        io.to(client.id).emit("createdChat", {
          members,
          sessionId,
          id: newChat._id.toString(),
          content: newChat.messages,
        });
      });
    });
  });
};

module.exports = { setupSockets };
