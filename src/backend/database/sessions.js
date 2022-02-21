const mongoose = require("mongoose");
const generateUniqueId = require("generate-unique-id");
const Session = require("../models/session.model");

const getAllSessions = async () => await Session.find().exec();

const getSessionById = async (sessionId) =>
  await Session.findOne(mongoose.Types.ObjectId(sessionId));

const getSession = async (
  sessionCode // getSessionBySessionCode
) => await Session.findOne({ sessionCode }).exec();

const getSessionByParticipantId = async (participantId) =>
  await Session.findOne({
    members: mongoose.Types.ObjectId(participantId),
  }).exec();

const createSession = async (hostId) => {
  const newSession = new Session({
    _id: mongoose.Types.ObjectId(),
    sessionCode: generateUniqueId({
      length: 6,
    }).toString(),
    members: [hostId],
  });

  newSession.save();
  return newSession;
};

const addSessionparticipant = async (sessionCode, newParticipant) => {
  const session = await getSession(sessionCode);
  if (!session)
    throw Error("Invalid session code. Session code does not exist.");
  if (session.members.includes(newParticipant))
    throw Error("Invalid participant. Participant already exists in session.");
  session.members = [...session.members, newParticipant];
  await session.save();
};

const removeSessionParticipant = async (sessionId, participantId) => {
  const session = await getSessionById(sessionId);
  if (!session)
    throw Error("Invalid session code. Session code does not exist.");
  if (!session.members.includes(participantId))
    throw Error("Invalid participant. Participant does not exist in session.");

  session.members = session.members.filter(
    (member) => member.toString() !== participantId
  );
  await session.save();
};

const deleteSession = async (sessionId) =>
  await Session.deleteOne({ _id: mongoose.Types.ObjectId(sessionId) });

module.exports = {
  getAllSessions,
  getSessionById,
  getSession,
  getSessionByParticipantId,
  createSession,
  addSessionparticipant,
  removeSessionParticipant,
  deleteSession,
};
