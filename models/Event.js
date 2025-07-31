const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  email: String,
  eventTitle: String,
  duration: String,
  date: String,
  time: String,
  timezone: String,
  conferenceDetails: String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
