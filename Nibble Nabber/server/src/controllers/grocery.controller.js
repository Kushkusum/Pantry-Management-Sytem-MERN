const Grocery = require('../models/grocery.model.js');

const createGrocery = async (req, res) => {
  try {

    const newGrocery = await Grocery.create(req.body);
    res.status(201).json({ message: 'Grocery item created', data: newGrocery });
  } catch (error) {
    res.status(500).json({ message: 'Error creating grocery item', error: error.message });
  }
};

const getAllGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.status(200).json({ data: groceries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groceries', error: error.message });
  }
};

const getGroceryById = async (req, res) => {
  const { id } = req.params;
  try {
    const grocery = await Grocery.findById(id);
    if (!grocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }
    res.status(200).json({ data: grocery });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grocery item', error: error.message });
  }
};

const updateGrocery = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedGrocery = await Grocery.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedGrocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }
    res.status(200).json({ message: 'Grocery item updated', data: updatedGrocery });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grocery item', error: error.message });
  }
};

const deleteGrocery = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGrocery = await Grocery.findByIdAndDelete(id);
    if (!deletedGrocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }
    res.status(200).json({ message: 'Grocery item deleted', data: deletedGrocery });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grocery item', error: error.message });
  }
};

module.exports = {
  createGrocery,
  getAllGroceries,
  getGroceryById,
  updateGrocery,
  deleteGrocery
};
