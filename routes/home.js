const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");


router.get("/", async (req, res) => {
    try {
      let carts = await Cart.find();
      res.send(carts);
    } catch (ex) {
      return res.status(500).send(ex.message);
    }
  });

module.exports = router;