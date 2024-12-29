// shoppingList.js (or wherever your routes are defined)
const express = require('express');
const router = express.Router();

// Assuming you have a shopping list service to handle the data
let shoppingList = []; // This can be replaced with your actual database logic

// POST request to add an item
router.post('/shopping-list', (req, res) => {
  const newItem = req.body; // Get the item from the request body
  if (!newItem.name || !newItem.quantity) {
    return res.status(400).json({ error: "Item name and quantity are required" });
  }

  shoppingList.push(newItem); // Save the item to the "database"
  res.status(201).json(newItem); // Respond with the saved item
});

// Export the router
module.exports = router;
