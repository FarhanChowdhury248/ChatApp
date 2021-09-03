const mongoose = require("mongoose");
const { MessageSchema } = require("./message.model");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  members: [mongoose.Schema.Types.ObjectId],
  messages: [MessageSchema],
  sessionId: mongoose.Schema.Types.ObjectId,
  isDeleted: Boolean,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
