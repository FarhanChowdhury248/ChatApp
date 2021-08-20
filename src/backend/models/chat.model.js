const mongoose = require("mongoose");
const Message = require("./message.model");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: mongoose.Schema.Types.ObjectId,
  message: String,
});

const chatSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  members: [mongoose.Schema.Types.ObjectId],
  messages: [MessageSchema],
  sessionId: mongoose.Schema.Types.ObjectId,
  isDeleted: Boolean,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
