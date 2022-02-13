const sessionDatabase = require("../database/sessions");
const particpantsService = require("../service/participants");

const getAllSessions = async () => ({
  sessions: await sessionDatabase.getAllSessions(),
});

const getSessionById = async (sessionId) =>
  await sessionDatabase.getSessionById(sessionId);

const getSessionByParticipantId = async (participantId) =>
  await sessionDatabase.getSessionByParticipantId(participantId);

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

const appendSessionParticipant = async (sessionCode, participantId) => {
  if (!sessionCode || !participantId)
    throw new Error(
      "Invalid parameters. sessionId and participantId must be valid."
    );

  const session = await sessionDatabase.getSession(sessionCode);
  if (!session.members.includes(participantId))
    await sessionDatabase.addSessionparticipant(sessionCode, participantId);
};

const removeSessionParticipant = async (sessionId, participantId) => {
  if (!sessionId || !participantId)
    throw new Error(
      "Invalid parameters. sessionId and participantId must be valid."
    );
  await sessionDatabase.removeSessionParticipant(sessionId, participantId);
  const session = await getSessionById(sessionId);
  if (session.members.length === 0) sessionDatabase.deleteSession(sessionId);
};

module.exports = {
  getAllSessions,
  getSessionById,
  getSessionByParticipantId,
  createSession,
  joinSessionParticipant,
  appendSessionParticipant,
  removeSessionParticipant,
};
