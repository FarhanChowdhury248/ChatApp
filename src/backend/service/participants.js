const participantsDatabase = require("../database/participants");

const getAllParticipants = async () => ({
  participants: await participantsDatabase.getAllParticipants(),
});

const getParticipantBySocketId = async (socketId) =>
  await participantsDatabase.getParticipantBySocketId(socketId);

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

const getParticipantNames = async (memberIds) => {
  if (memberIds === null || memberIds === undefined)
    throw new Error("Bad request. Required parameters missing.");
  const participants = await participantsDatabase.getParticipantNames(
    memberIds
  );
  return participants;
};

const updateParticipantSocketId = async (participantId, socketId = null) => {
  if (!participantId)
    throw new Error("Bad request. Required parameters missing.");
  await participantsDatabase.updateParticipantSocketId(participantId, socketId);
};

const deleteParticipant = async (participantId) => {
  if (!participantId)
    throw new Error("Bad request. Required parameters missing.");
  await participantsDatabase.deleteParticipant(participantId);
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantBySocketId,
  getSocketIds,
  updateParticipantSocketId,
  getParticipantNames,
  deleteParticipant,
};
