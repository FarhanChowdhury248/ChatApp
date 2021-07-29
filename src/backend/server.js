const express = require("express");
const cors = require("cors");
require("dotenv").config();

const socket = require("socket.io");

const mongoose = require("mongoose");
const Session = require("./models/session.model");
const Participant = require("./models/participant.model");

const sessionsRouter = require("./controller/sessions");
const participantsRouter = require("./controller/participants");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/sessions", sessionsRouter);
app.use("/participants", participantsRouter);

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// sockets
const io = socket(server);

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

io.on("connection", (socket) => {
  console.log("made connection: " + socket.id);

  socket.on("joinRoom", async ({ sessionId }) => {
    const roomName = getRoomName(sessionId);
    socket.join(roomName);

    socket.emit("updateParticipants", {
      participants: await getRoomParticipants(sessionId),
    });
  });
});
