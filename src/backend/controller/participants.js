const router = require('express').Router();
const mongoose = require('mongoose');
let Participant = require('../models/participant.model');

router.route('/').get((req, res) => {
    Participant.find()
      .then(participants => res.json(participants))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/create').post((req, res) => {

    if (req.body.userName === "") {
        res.status(400).json("Error: username must not be empty");
        return;
    }

    const newParticipant = new Participant(
        {
        _id: mongoose.Types.ObjectId(),
        name: req.body.userName,
        role: "Host"
        }
    );

    newParticipant.save()
        .then(() => res.status(201).json({hostId: newParticipant._id.toString()}))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;