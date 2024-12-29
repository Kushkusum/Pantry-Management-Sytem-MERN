import React, { createContext, useState, useContext } from 'react';

// Create a context
export const ShoppingListContext = createContext();

// Create a provider to wrap around your app
export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Add item to the shopping list
  const addItem = (item) => {
    setItems([...items, item]);
  };

  // Remove item from the shopping list
  const removeItem = (index) => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
  };

  return (
    <ShoppingListContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

// Create a custom hook to access the context
export const useShoppingList = () => useContext(ShoppingListContext);

