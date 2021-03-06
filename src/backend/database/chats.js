const mongoose = require("mongoose");
const Chat = require("../models/chat.model");
const { Message } = require("../models/message.model");

const getAllChats = async () => await Chat.find().exec();

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

const getChatById = async (chatId) =>
  await Chat.findOne({ _id: mongoose.Types.ObjectId(chatId) });

const addChatMessage = async (chatId, messagePayload) => {
  const chat = await getChatById(chatId);
  const newMessage = new Message({
    sender: messagePayload.sender,
    message: messagePayload.message,
  });

  chat.messages = [...chat.messages, newMessage];
  await chat.save();
};

const getChatsBySessionId = async (sessionId) => {
  const res = await Chat.find({
    sessionId: mongoose.Types.ObjectId(sessionId),
  }).exec();
  return res;
};

const getChatsByParticipantId = async (participantId) => {
  console.log(participantId);
  const res = await Chat.find({
    members: mongoose.Types.ObjectId(participantId),
  }).exec();
  console.log(res);
  return res;
};

module.exports = {
  getAllChats,
  createChat,
  getChatById,
  addChatMessage,
  getChatsBySessionId,
  getChatsByParticipantId,
};
