const chatsDatabase = require("../database/chats");
const { getAllParticipants } = require("./participants");
const { getAllSessions } = require("./sessions");

const getAllChats = async () => ({ chats: await chatsDatabase.getAllChats() });

const createChat = async (members, sessionId, initialContent) => {
  if (!sessionId || !members || !Array.isArray(members))
    throw new Error("Bad request. Required parameters missing.");

  const messages = initialContent ? [initialContent] : [];
  const { sessions } = await getAllSessions();
  if (!sessions.some((session) => session._id.toString() === sessionId))
    throw new Error("Invalid session id. Session does not exist.");

  if (Array.from(new Set(members)).length < 1)
    throw new Error("Invalid members. Must have at least 2 unique members.");
  const { participants } = await getAllParticipants();
  if (
    members.some(
      (memberId) =>
        !participants.some(
          (participant) => participant._id.toString() === memberId
        )
    )
  )
    throw new Error("Invalid participant id. Participant does not exist.");
  return await chatsDatabase.createChat(members, sessionId, messages);
};

const updateChat = async (chatId, updateType, updateData) => {
  if (!chatId || !updateData || !updateType) {
    throw new Error("Bad request. Required parameters missing.");
  }

  const { chats } = await getAllChats();
  if (!chats.some((chat) => chat._id.toString() === chatId))
    throw new Error("Invalid chat id. Chat does not exist.");

  if (updateType === "messageSent")
    await chatsDatabase.addChatMessage(chatId, updateData);
  else throw new Error("Invalid updateType. updateType not recognized.");
};

module.exports = { getAllChats, createChat, updateChat };
