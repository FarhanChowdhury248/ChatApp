const chatsDatabase = require("../database/chats");
const { getAllParticipants } = require("./participants");
const { getAllSessions } = require("./sessions");

const createChat = async (members, sessionId, initialContent) => {
  const messages = initialContent ? [initialContent] : [];

  if (!sessionId) throw new Error("Bad request. Required parameters missing.");
  const { sessions } = await getAllSessions();
  if (!sessions.some((session) => session._id.toString() === sessionId))
    throw new Error("Invalid session id. Session does not exist.");

  if (!members || !Array.isArray(members))
    throw new Error("Bad request. Required parameters missing.");
  if (Array.from(new Set(members)).length < 2)
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

module.exports = { createChat };
