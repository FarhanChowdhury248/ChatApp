const sessionDatabase = require("../database/sessions");

const getAllSessions = async () => ({
  sessions: await sessionDatabase.getAllSessions(),
});

const createSession = async (username) => {
  if (!username || username.length === 0)
    throw new Error("Invalid username. Username must be non-empty string.");

  const newHost = await sessionDatabase.createUser(username, "Host");
  const newSession = await sessionDatabase.createSession(newHost._id);

  return {
    sessionCode: newSession.sessionCode,
    sessionId: newSession._id,
    participantId: newHost._id,
  };
};

const joinSessionParticipant = async (username, sessionCode) => {
  if (!username || username.length === 0)
    throw new Error("Invalid username. Username must be non-empty string.");
  if (!sessionCode || sessionCode.length === 0)
    throw new Error(
      "Invalid session code. Session code must be non-empty string."
    );

  const newParticipant = await sessionDatabase.createUser(username);
  await sessionDatabase.addSessionparticipant(sessionCode, newParticipant);
  const session = await sessionDatabase.getSession(sessionCode);

  return {
    sessionCode: session.sessionCode,
    sessionId: session._id,
    participantId: newParticipant._id,
  };
};

module.exports = {
  getAllSessions,
  createSession,
  joinSessionParticipant,
};
