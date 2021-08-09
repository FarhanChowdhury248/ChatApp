const mongoose = require("mongoose");
const generateUniqueId = require("generate-unique-id");
const Session = require("../models/session.model");

const getAllSessions = async () => await Session.find().exec();

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

const getSession = async (sessionCode) =>
  await Session.findOne({ sessionCode }).exec();

const addSessionparticipant = async (sessionCode, newParticipant) => {
  const session = await getSession(sessionCode);
  if (!session)
    throw Error("Invalid session code. Session code does not exist.");
  session.members = [...session.members, newParticipant];
  await session.save();
};

module.exports = {
  getAllSessions,
  createSession,
  getSession,
  addSessionparticipant,
};
