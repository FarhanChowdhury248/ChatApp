const router = require("express").Router();
const {
  getAllSessions,
  createSession,
  joinSessionParticipant,
} = require("../service/sessions");

router.route("/").get(async (req, res) => {
  try {
    const sessions = await getAllSessions();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.route("/create").post(async (req, res) => {
  try {
    const { userName } = req.body;
    const newSessionData = await createSession(userName);
    res.status(200).json(newSessionData);
  } catch (err) {
    res.status(400).json(err.name + ": " + err.message);
  }
});

router.route("/join").put(async (req, res) => {
  try {
    const { sessionCode, username } = req.body;
    const joinedSessionData = await joinSessionParticipant(
      username,
      sessionCode
    );
    res.status(200).json(joinedSessionData);
  } catch (err) {
    res.status(400).json(err.name + ": " + err.message);
  }
});

module.exports = router;
