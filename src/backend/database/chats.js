const mongoose = require("mongoose");
const Chat = require("../models/chat.model");

const createChat = async (members, sessionId, messages) => {
  const newChat = new Chat({
    _id: mongoose.Types.ObjectId(),
    members,
    messages,
    sessionId,
    isDeleted: false,
  });

  await newChat.save();
  return newChat;
};

module.exports = { createChat };
