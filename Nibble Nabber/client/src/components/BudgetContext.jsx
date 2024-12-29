// BudgetContext.js
import React, { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();

export const useBudget = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(0); // Current budget value
  const [budgetHistory, setBudgetHistory] = useState([]); // Budget history

  // Function to update budget history
  const addToHistory = (newBudget) => {
    setBudgetHistory((prevHistory) => [...prevHistory, newBudget]);
  };

  return (
    <BudgetContext.Provider value={{ budget, setBudget, budgetHistory, addToHistory }}>
      {children}
    </BudgetContext.Provider>
  );
};
