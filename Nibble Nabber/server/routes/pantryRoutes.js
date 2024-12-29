const express = require('express');
const PantryItem = require('../models/PantryItem');
const router = express.Router();

// Hardcoded user ID
const hardcodedUserId = "hardcoded-user-id";

// Fetch all pantry items
router.get('/', async (req, res) => {
  try {
    const pantryItems = await PantryItem.find({ userId: hardcodedUserId });
    res.json(pantryItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new pantry item
router.post('/', async (req, res) => {
  const { name, quantity, expiry } = req.body;
  const newItem = new PantryItem({ name, quantity, expiry, userId: hardcodedUserId });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a pantry item's quantity
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await PantryItem.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a pantry item
router.delete('/:id', async (req, res) => {
  try {
    await PantryItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
