const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cartNumber: {
    type: String
  },  
  contactName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
  },
  favCount: Number,
  deceased: {
    type: Boolean,
    default: false
  },
  downloadableUrl: String
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;