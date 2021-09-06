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
  // TODO: test for bugs with multiple memberIds
  const res = await Promise.all(
    memberIds.map((id) =>
      Participant.find({
        _id: mongoose.Types.ObjectId(id),
      }).exec()
    )
  );
  return res[0].map((client) => client.socketId);
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
};
