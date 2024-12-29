
import React, { useState } from 'react';

function UpdateItemForm({ item }) {
  const [showForm, setShowForm] = useState(false);

  // Function to handle the update button click
  const handleUpdateClick = () => {
    setShowForm(!showForm); // Toggle the form display
  };

  return (
    <div>
      <button onClick={handleUpdateClick}>Update Item</button>

      {showForm && (
        <div className="update-form">
          <h2>Update Item</h2>
          <div className="category">
            <label>Category:</label>
            <select name="category">
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="frozen">Frozen</option>
              <option value="meat">Meat</option>
              <option value="pantry">Pantry</option>
              <option value="grains">Grains + Bread</option>
              <option value="baking">Baking + Oil + Condiments</option>
              <option value="drinks">Drinks</option>
              <option value="household">Household</option>
              <option value="canned">Canned</option>
              <option value="misc">Misc</option>
            </select>
          </div>
          <div className="item-summary">
            <h3>Item Summary</h3>
            <p><strong>Item:</strong> {item.name}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Expiry Date:</strong> {item.expiry}</p>
          </div>
          <div className="update-fields">
            <label>Update Quantity:</label>
            <input type="number" name="quantity" defaultValue={item.quantity} />
            <label>Update Expiry Date:</label>
            <input type="date" name="expiry" defaultValue={item.expiry} />
          </div>
          <button type="submit">Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default UpdateItemForm;
