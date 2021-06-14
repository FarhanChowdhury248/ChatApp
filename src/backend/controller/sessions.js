const router = require('express').Router();
const mongoose = require('mongoose');
const generateUniqueId = require('generate-unique-id');
let Session = require('../models/session.model');

router.route('/').get((req, res) => {
  Session.find()
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {

  const newSession = new Session(
    {
      _id: mongoose.Types.ObjectId(),
      sessionCode: generateUniqueId({
        length: 6 
      }).toString(),
      members: [req.body.hostId]
    }
  );

  newSession.save()
    .then(() => res.status(201).json({sessionCode: newSession.sessionCode}))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;