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

const getSocketIds = async (memberIds) =>
  memberIds.map(
    async (id) =>
      (
        await Participant.find({
          _id: mongoose.Schema.Types.ObjectId(id),
        }).exec()
      ).socketId
  );

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
};
