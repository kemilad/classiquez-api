const express = require("express");
const jwt = require("jsonwebtoken");
const jwtSecret = require('./verifyJwtToken');

const router = express.Router();


const Cart = require("../models/cart");



router.post("/", async (req, res) => {
    // Check token in request header and see if the token is valid or not
    const token = req.header("x-jwt-token");
    if (!token) {
      return res.status(401).send("Access denied!");
    }
  
    try {
      jwt.verify(token, jwtSecret);
    } catch (e) {
      return res.status(400).send("Invalid token");
    }
  
    if (!req.body.name) {
      return res.status(400).send("Please check request again!");
    }
  
    try {
      let cartToAdd = new Cart({
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        favCount: req.body.favCount
      });
  
      cartToAdd = await cartToAdd.save();
      res.send(cartToAdd);
    } catch (ex) {
      return res.status(500).send(ex.message);
    }
  });

  module.exports = router;