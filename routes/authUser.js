const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const jwtSecret = require('./verifyJwtToken');

router.post("/", async (req, res) => {
  // Compare passwords and see if person is authenticated
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid login credentials");
  }

  let isPwValid = user.password === req.body.password;
  if (!isPwValid) {
    return res.status("400").send("Invalid login credentials");
  }

  let token = jwt.sign({ id: user._id, email: user.email }, jwtSecret);

  res.send({
    token: token
  });
});

module.exports = router;