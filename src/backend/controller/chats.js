const router = require("express").Router();

const { createChat } = require("../service/chats");

router.route("/").post(async (req, res) => {
  try {
    const { members, sessionId, initialContent } = req.body;
    const newChat = await createChat(members, sessionId, initialContent);
    res.status(200).json({ chatId: newChat._id.toString() });
  } catch (err) {
    res.status(400).json(err.name + ": " + err.message);
  }
});

module.exports = router;
