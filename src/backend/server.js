const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const sessionsRouter = require("./controller/sessions");
const participantsRouter = require("./controller/participants");
const chatRouter = require("./controller/chats");

const { setupSockets } = require("./sockets");

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
app.use("/chats", chatRouter);

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

setupSockets(server);
