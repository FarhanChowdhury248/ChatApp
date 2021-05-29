const router = require('express').Router();
let Session = require('../models/session.model');

router.route('/').get((req, res) => {
  Session.find()
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const newUser = new Session();

  newUser.save()
    .then(() => res.json('Session created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;