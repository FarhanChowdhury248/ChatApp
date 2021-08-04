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

module.exports = { createParticipant, getAllParticipants };
