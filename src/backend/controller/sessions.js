const router = require("express").Router();
const mongoose = require("mongoose");
const generateUniqueId = require("generate-unique-id");
const Session = require("../models/session.model");
const Participant = require("../models/participant.model");

router.route("/").get((req, res) => {
  Session.find()
    .then((sessions) => res.json(sessions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const createHost = async () => {
    const newHost = new Participant({
      _id: mongoose.Types.ObjectId(),
      name: req.body.userName,
      role: "Host",
    });

    const newHostId = await newHost.save().then(() => newHost._id);
    return { newHostId };
  };

  (async () => {
    const { newHostId } = await createHost();

    const newSession = new Session({
      _id: mongoose.Types.ObjectId(),
      sessionCode: generateUniqueId({
        length: 6,
      }).toString(),
      members: [newHostId],
    });

    newSession
      .save()
      .then(() =>
        res.status(201).json({
          sessionCode: newSession.sessionCode,
          sessionId: newSession._id,
          participantId: newHostId,
        })
      )
      .catch((err) => res.status(400).json("Error: " + err));
  })();
});

module.exports = router;
