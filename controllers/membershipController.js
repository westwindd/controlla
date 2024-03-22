// controllers/membershipController.js
const Membership = require('../models/Membership');

exports.addMembership = async (req, res) => {
  try {
    const membership = new Membership(req.body);
    const result = await membership.save();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error adding membership.");
  }
};

exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.send(memberships);
  } catch (error) {
    res.status(500).send("Error fetching memberships.");
  }
};
