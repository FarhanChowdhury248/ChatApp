const router = require("express").Router();
const mongoose = require("mongoose");
const generateUniqueId = require("generate-unique-id");
const Session = require("../models/session.model");
const Participant = require("../models/participant.model");

const getAllSessions = async () => await Session.find().exec();

const createUser = async (username, role = "Guest") => {
  const newUser = new Participant({
    _id: mongoose.Types.ObjectId(),
    name: username,
    role,
  });

  await newUser.save();
  return newUser;
};

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

router.route("/").get(async (req, res) => {
  try {
    const sessions = await getAllSessions();
    res.status(200).json({
      sessions,
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/create").post(async (req, res) => {
  try {
    const { userName } = req.body;

    if (userName.length === 0)
      throw new Error("Invalid username. Username must be non-empty string.");

    const newHost = await createUser(userName, "Host");
    const newSession = await createSession(newHost._id);

    res.status(200).json({
      sessionCode: newSession.sessionCode,
      sessionId: newSession._id,
      participantId: newHost._id,
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/join").put(async (req, res) => {
  try {
    const { sessionCode, username } = req.body;

    if (username.length === 0)
      throw new Error("Invalid username. Username must be non-empty string.");
    if (sessionCode.length === 0)
      throw new Error(
        "Invalid session code. Session code must be non-empty string."
      );

    const newParticipant = await createUser(username);
    addSessionparticipant(sessionCode, newParticipant);
    const session = await getSession(sessionCode);

    res.status(200).json({
      sessionCode: session.sessionCode,
      sessionId: session._id,
      participantId: newParticipant._id,
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
