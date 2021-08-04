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

module.exports = { createParticipant, getAllParticipants };
