import React, { createContext, useState, useContext } from 'react';

// Create context for Pantry
export const PantryContext = createContext();

// Create a provider to wrap around your app
export const PantryProvider = ({ children }) => {
  const [pantryItems, setPantryItems] = useState([]);

  // Add item to the pantry
  const addPantryItem = (item) => {
    setPantryItems([...pantryItems, item]);
  };

  // Update the quantity of a pantry item
  const updatePantryItemQuantity = (index, quantity) => {
    const updatedItems = pantryItems.map((item, idx) =>
      idx === index ? { ...item, quantity } : item
    );
    setPantryItems(updatedItems);
  };

  // Remove item from the pantry
  const removePantryItem = (index) => {
    const updatedItems = pantryItems.filter((_, idx) => idx !== index);
    setPantryItems(updatedItems);
  };

  return (
    <PantryContext.Provider value={{ pantryItems, addPantryItem, updatePantryItemQuantity, removePantryItem }}>
      {children}
    </PantryContext.Provider>
  );
};

// Custom hook to access pantry context
export const usePantry = () => useContext(PantryContext);
