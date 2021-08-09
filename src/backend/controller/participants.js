const router = require("express").Router();

const {
  createParticipant,
  getAllParticipants,
} = require("../service/participants");

router.route("/").get(async (req, res) => {
  try {
    const participants = await getAllParticipants();
    res.status(200).json(participants);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.route("/create").post(async (req, res) => {
  try {
    const { userName } = req.body;
    const newParticipant = await createParticipant(userName);
    res.status(200).json({ participantId: newParticipant._id.toString() });
  } catch (err) {
    res.status(400).json(err.name + ": " + err.message);
  }
});

module.exports = router;
