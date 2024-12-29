const express = require('express');
const ShoppingListItem = require('../models/ShoppingList'); // Import the shopping list model
const router = express.Router();

// Hardcoded user ID (use actual user authentication in a real app)
const hardcodedUserId = "hardcoded-user-id";

// Fetch all shopping list items
router.get('/', async (req, res) => {
  try {
    const shoppingListItems = await ShoppingListItem.find({ userId: hardcodedUserId });
    res.json(shoppingListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new shopping list item
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  // Validate input
  if (!name || !quantity) {
    return res.status(400).json({ message: 'Item name and quantity are required' });
  }

  const newItem = new ShoppingListItem({ name, quantity, userId: hardcodedUserId });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem); // Send the saved item back to the client
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a shopping list item's quantity
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await ShoppingListItem.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a shopping list item
router.delete('/:id', async (req, res) => {
  try {
    await ShoppingListItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
