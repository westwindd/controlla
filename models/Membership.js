const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: String,
  value: String,
  imageUrl: String,
  color: String
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;
