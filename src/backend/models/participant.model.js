const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema(
{
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true},
  role: {type: String, enum: ['Host', 'Guest'], required: true}
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;