// CartPage.js (Updated with centered box style)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const API_BASE_URL = 'http://localhost:5000/api/shopping-list';

  // Fetch shopping list items
  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => setItems(response.data))
      .catch((err) => console.error('Error fetching shopping list:', err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-purple-700 mb-6 text-center">My Shopping Cart</h1>

        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item._id} className="bg-gray-50 p-4 rounded-md shadow-md flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-800">{item.name}</span>
                  <span className="ml-2 text-sm font-semibold text-gray-600">(x{item.quantity})</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-lg">Your cart is empty. Add items to the shopping list!</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
