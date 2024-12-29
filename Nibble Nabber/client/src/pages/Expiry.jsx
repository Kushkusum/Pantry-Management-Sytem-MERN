import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Expiry.css';

const Expiry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [usedItems, setUsedItems] = useState(new Set()); // Track used items by their ID

  useEffect(() => {
    // Fetch pantry items from backend
    axios.get('http://localhost:5000/api/pantry')
      .then(response => setPantryItems(response.data))
      .catch(error => console.error('Error fetching pantry items:', error));
  }, []);

  const handleMarkAsUsed = (id) => {
    setUsedItems(prevState => new Set(prevState).add(id)); // Add item ID to the used set
  };

  const sortedItems = [...pantryItems].sort((a, b) => new Date(a.expiry) - new Date(b.expiry));

  return (
    <div className="expiry-container">
      <h1>Expiring Items</h1>
      {sortedItems.length === 0 ? (
        <p className="no-items-message">No items are expiring soon!</p>
      ) : (
        <div className="expiry-items-container">
          {sortedItems.map((item) => (
            <div
              key={item._id}
              className={`expiry-item-card ${usedItems.has(item._id) ? 'used' : ''}`}
            >
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p className="expiry-date">Expiry: {new Date(item.expiry).toLocaleDateString()}</p>
              <button
                className="mark-used-btn"
                onClick={() => handleMarkAsUsed(item._id)}
              >
                Mark as Used
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expiry;
