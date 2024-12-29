const express = require('express');
const Pantry = require('../models/PantryItem'); // Assuming a pantry model exists
const router = express.Router();

// Fetch recommendations based on pantry items
router.get('/', async (req, res) => {
  try {
    const pantryItems = await Pantry.find();

    const recommendations = pantryItems.filter((item) => {
      const isExpiringSoon = item.expirationDate
        ? new Date(item.expirationDate) - new Date() <= 3 * 24 * 60 * 60 * 1000 // 3 days
        : false;
      const isLowStock = item.quantity <= 2;

      return isExpiringSoon || isLowStock;
    });

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
