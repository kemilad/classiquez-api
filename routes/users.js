const express = require("express");

const router = express.Router();
const crypto = require('crypto');


const User = require("../models/user");

router.post("/", async (req, res) => {
  
// Create user and save to db
  let userToBeCreated = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob,
    password: crypto.createHash('md5').update(req.body.password).digest("hex")
  });

  await userToBeCreated.save();
  return res.send({
    firstName: userToBeCreated.firstName,
    email: userToBeCreated.email
  });
});

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

module.exports = router;