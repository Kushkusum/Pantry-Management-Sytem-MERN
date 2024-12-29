import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTrashAlt, FaPlus } from 'react-icons/fa';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE_URL = 'http://localhost:5000/api/shopping-list';

  // Fetch shopping list items
  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => setItems(response.data))
      .catch((err) => console.error('Error fetching shopping list:', err));
  }, []);

  // Fetch recommendations
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/recommendations')
      .then((response) => setRecommendations(response.data))
      .catch((err) => console.error('Error fetching recommendations:', err));
  }, []);

  // Add a new shopping list item
  const handleAddItem = async () => {
    if (inputValue.trim() === '' && quantity <= 0) {
      setErrorMessage('Please enter both item and quantity.');
      return;
    }
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter an item.');
      return;
    }
    if (quantity <= 0) {
      setErrorMessage('Please enter a valid quantity.');
      return;
    }

    setErrorMessage(''); // Clear error message if validation passes

    const newItem = { name: inputValue, quantity, checked: false };

    try {
      const response = await axios.post(API_BASE_URL, newItem);
      setItems([...items, response.data]); // Add newly created item to the list
      setInputValue(''); // Clear the input field
      setQuantity(1); // Reset quantity to 1
    } catch (error) {
      console.error('Error adding item:', error.response || error.message);
    }
  };

  // Add a recommended item
  const handleAddRecommended = async (name) => {
    const newItem = { name, quantity: 1, checked: false };
    try {
      const response = await axios.post(API_BASE_URL, newItem);
      setItems([...items, response.data]); // Add recommended item to list
    } catch (error) {
      console.error('Error adding recommended item:', error.response || error.message);
    }
  };

  // Toggle item checked state (mark as purchased)
  const handleToggleItem = async (id) => {
    const item = items.find((item) => item._id === id);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        ...item,
        checked: !item.checked,
      });
      setItems(items.map((i) => (i._id === id ? response.data : i)));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setItems(items.filter((item) => item._id !== id)); // Remove item from the list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="shopping-list-container p-6 min-h-screen" style={{ background: 'linear-gradient(145deg, #dfd3d1, #beb1b4)' }}>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">My Shopping List</h1>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Add Item Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-2 md:space-y-0 md:space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new item..."
          className="p-2 w-full md:w-1/2 lg:w-1/3 text-lg border border-gray-300 rounded-md focus:outline-none shadow-sm"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, e.target.value))}
          placeholder="Qty"
          className="p-2 w-1/4 md:w-1/6 text-lg border border-gray-300 rounded-md focus:outline-none shadow-sm"
          min="1"
        />
        <button
          onClick={handleAddItem}
          className="flex items-center justify-center p-2 bg-[#d36b6b] text-white rounded-md hover:bg-[#bc5c5c] transition duration-300 shadow-sm"
        >
          <FaPlus size={16} className="mr-1" /> Add
        </button>
      </div>

      {/* Shopping List Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className={`p-4 bg-white rounded-lg shadow-md flex items-center justify-between transition-all duration-300 ${
                item.checked ? 'bg-green-100 border-l-4 border-green-500' : ''
              }`}
            >
              <div>
                <span
                  className={`text-lg font-medium ${
                    item.checked ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`ml-2 text-sm font-semibold ${
                    item.checked ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  (x{item.quantity})
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleToggleItem(item._id)}
                  className="text-green-500 hover:text-green-700 transition duration-300"
                >
                  <FaCheckCircle size={20} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-3">
            Your shopping list is empty. Start adding items!
          </p>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between transition-all duration-300"
              style={{
                background: 'linear-gradient(145deg, #dfd3d1, #beb1b4)', // Gradient for recommendations
              }}
            >
              <span className="text-lg font-medium text-gray-800">{rec.name}</span>
              <button
                onClick={() => handleAddRecommended(rec.name)}
                className="p-2 bg-[#d36b6b] text-white rounded-md hover:bg-[#bc5c5c] transition duration-300 shadow-sm"
              >
                <FaPlus size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
