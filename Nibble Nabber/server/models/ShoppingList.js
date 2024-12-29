const mongoose = require('mongoose');

// Define the schema for the shopping list item
const shoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchased: { type: Boolean, default: false }, // Flag to mark if item is purchased
  userId: { type: String, required: true }, // Hardcoded user ID
  createdAt: { type: Date, default: Date.now }, // To track when the item was added
});

// Create the model
const ShoppingListItem = mongoose.model('ShoppingListItem', shoppingListSchema);

module.exports = ShoppingListItem;
