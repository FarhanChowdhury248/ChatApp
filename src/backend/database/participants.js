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

const getParticipantBySocketId = async (socketId) =>
  await Participant.findOne({ socketId }).exec();

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
      Participant.findOne({
        _id: mongoose.Types.ObjectId(id),
      }).exec()
    )
  );
  return res.map((client) => ({ name: client.name, id: client._id }));
};

const updateParticipantSocketId = async (participantId, socketId) =>
  await Participant.updateOne(
    { _id: mongoose.Types.ObjectId(participantId) },
    { socketId }
  ).exec();

const deleteParticipant = async (participantId) =>
  await Participant.deleteOne({ _id: mongoose.Types.ObjectId(participantId) });

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantBySocketId,
  getSocketIds,
  updateParticipantSocketId,
  getParticipantNames,
  deleteParticipant,
};
