const socket = require("socket.io");

const Session = require("./models/session.model");
const Participant = require("./models/participant.model");

const getRoomName = (code) => "Room: " + code;

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

    socket.on("joinRoom", async ({ sessionId }) => {
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
  });
};

module.exports = { setupSockets };
