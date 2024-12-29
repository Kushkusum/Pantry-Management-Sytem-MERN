const mongoose = require('mongoose');

const pantryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiry: { type: Date, required: true },
  userId: { type: String, required: true }, // Changed userId to String for simplicity
});

const PantryItem = mongoose.model('PantryItem', pantryItemSchema);
module.exports = PantryItem;
