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
    password: crypto.createHash('md5').update(request.body.Password).digest("hex")
  });

  await userToBeCreated.save();
  return res.send({
    firstName: userToBeCreated.firstName,
    email: userToBeCreated.email
  });
});

module.exports = router;