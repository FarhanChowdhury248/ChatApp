const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
{
  _id: mongoose.Schema.Types.ObjectId,
  sessionCode: {type: String, required: true},
  members: {type: [String], required: true}
}, {
  timestamps: true,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;