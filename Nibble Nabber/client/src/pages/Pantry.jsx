import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pantry.css';

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [newPantryItem, setNewPantryItem] = useState('');
  const [newPantryQuantity, setNewPantryQuantity] = useState('');
  const [newPantryExpiry, setNewPantryExpiry] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const PIXABAY_API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/pantry')
      .then((response) => setPantryItems(response.data))
      .catch((error) => console.error('Error fetching pantry items:', error));
  }, []);

  // Function to fetch image using Pixabay API
  const fetchImage = async (query) => {
    setLoadingImage(true);
    try {
      const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&pretty=true`;
      const response = await axios.get(url);

      console.log('Pixabay Response:', response.data);

      if (response.data.hits.length > 0) {
        return response.data.hits[0].webformatURL;
      } else {
        return 'https://via.placeholder.com/150';
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return 'https://via.placeholder.com/150';
    } finally {
      setLoadingImage(false);
    }
  };

  const handleAddPantryItem = async () => {
    if (!newPantryItem || !newPantryQuantity || !newPantryExpiry) {
      setErrorMessage('All fields are required. Please enter the item and quantity.');
      return;
    }

    setErrorMessage('');
    const imageUrl = await fetchImage(newPantryItem);
    const newItem = {
      name: newPantryItem,
      quantity: newPantryQuantity,
      expiry: newPantryExpiry,
      imageUrl,
    };

    axios
      .post('http://localhost:5000/api/pantry', newItem)
      .then((response) => {
        setPantryItems([...pantryItems, response.data]);
        setNewPantryItem('');
        setNewPantryQuantity('');
        setNewPantryExpiry('');
      })
      .catch((error) => console.error('Error adding pantry item:', error));
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`http://localhost:5000/api/pantry/${id}`)
      .then(() => {
        setPantryItems(pantryItems.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting pantry item:', error);
        alert('Error deleting item');
      });
  };

  return (
    <div className="pantry-container">
      <h1>Pantry</h1>
      <form>
        <input
          type="text"
          placeholder="Item Name"
          value={newPantryItem}
          onChange={(e) => setNewPantryItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newPantryQuantity}
          onChange={(e) => setNewPantryQuantity(e.target.value)}
        />
        <input
          type="date"
          value={newPantryExpiry}
          onChange={(e) => setNewPantryExpiry(e.target.value)}
        />
        <button type="button" onClick={handleAddPantryItem}>
          Add Item
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="pantry-items-grid">
        {pantryItems.map((item) => (
          <div key={item._id} className="pantry-item-card">
            <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} />
            <div className="pantry-item-details">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p className="expiry">
                Expiry: {new Date(item.expiry).toLocaleDateString('en-GB')}
              </p>
            </div>
            <button className="delete-btn" onClick={() => handleDeleteItem(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pantry;
