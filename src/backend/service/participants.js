const participantsDatabase = require("../database/participants");

const getAllParticipants = async () => ({
  participants: await participantsDatabase.getAllParticipants(),
});

const createParticipant = async (username, role = "Guest") => {
  if (!username || username.length === 0)
    throw new Error("Invalid username. Username must be non-empty string.");

  const newParticipant = await participantsDatabase.createParticipant(
    username,
    role
  );

  return newParticipant;
};

const getSocketIds = async (memberIds) => {
  if (memberIds === null || memberIds === undefined)
    throw new Error("Bad request. Required parameters missing.");
  const socketIds = await participantsDatabase.getSocketIds(memberIds);
  return socketIds;
};

const updateParticipantSocketId = async (participantId, socketId) => {
  if (!participantId || !socketId)
    throw new Error("Bad request. Required parameters missing.");
  await participantsDatabase.updateParticipantSocketId(participantId, socketId);
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getSocketIds,
  updateParticipantSocketId,
};
