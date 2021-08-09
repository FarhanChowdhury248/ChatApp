const sessionDatabase = require("../database/sessions");
const particpantsService = require("../service/participants");

const getAllSessions = async () => ({
  sessions: await sessionDatabase.getAllSessions(),
});

const createSession = async (username) => {
  const newHost = await particpantsService.createParticipant(username, "Host");
  const newSession = await sessionDatabase.createSession(newHost._id);

  return {
    sessionCode: newSession.sessionCode,
    sessionId: newSession._id,
    participantId: newHost._id,
  };
};

const joinSessionParticipant = async (username, sessionCode) => {
  if (!sessionCode || sessionCode.length === 0)
    throw new Error(
      "Invalid session code. Session code must be non-empty string."
    );

  const newParticipant = await particpantsService.createParticipant(username);
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
