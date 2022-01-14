const mongoose = require("mongoose");
const Participant = require("../models/participant.model");

const createParticipant = async (username, role) => {
  const newUser = new Participant({
    _id: mongoose.Types.ObjectId(),
    name: username,
    role,
  });

  await newUser.save();
  return newUser;
};

const getAllParticipants = async () => await Participant.find().exec();

const getSocketIds = async (memberIds) => {
  const res = await Promise.all(
    memberIds.map((id) =>
      Participant.find({
        _id: mongoose.Types.ObjectId(id),
      }).exec()
    )
  );
  return res.map((client) => client[0].socketId);
};

const getParticipantNames = async (participantIds) => {
  const res = await Promise.all(
    participantIds.map((id) =>
      Participant.find({
        _id: mongoose.Types.ObjectId(id),
      }).exec()
    )
  );
  return res.map((client) => client[0].name);
};

const updateParticipantSocketId = async (participantId, socketId) =>
  await Participant.updateOne(
    { _id: mongoose.Types.ObjectId(participantId) },
    { socketId }
  ).exec();

module.exports = {
  createParticipant,
  getAllParticipants,
  getSocketIds,
  updateParticipantSocketId,
  getParticipantNames,
};
