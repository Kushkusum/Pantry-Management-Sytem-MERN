// BudgetPage.js
import React, { useState, useEffect } from 'react';
import { useBudget } from '../components/BudgetContext';
import './Budget.css';

const BudgetPage = () => {
  const { budget, setBudget, budgetHistory, addToHistory } = useBudget();
  const [newBudget, setNewBudget] = useState('');
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // Handle new budget input
  const handleBudgetChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setError('Budget must be a positive number');
    } else {
      setError('');
    }
    setNewBudget(value);
  };

  // Save new budget
  const handleSaveBudget = () => {
    if (newBudget && newBudget > 0) {
      setBudget(Number(newBudget)); // Update the budget
      addToHistory(Number(newBudget)); // Add to history
      setNewBudget(''); // Reset input
      setConfirmationMessage(`Budget updated to $${newBudget}`);
      setTimeout(() => setConfirmationMessage(''), 3000); // Hide after 3 seconds
    } else {
      setError('Please enter a valid budget');
    }
  };

  return (
    <div className="budget-page-container">
      <div className="budget-content">
        <h1 className="budget-header">Budget Page</h1>
        <p className="budget-current">Current Budget: ${budget}</p>

        <input
          type="number"
          value={newBudget}
          onChange={handleBudgetChange}
          placeholder="Enter new budget"
          className="budget-input"
        />
        {error && <p className="error-message">{error}</p>}

        <button onClick={handleSaveBudget} className="budget-button">
          Save Budget
        </button>

        {/* Confirmation Message */}
        {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}

        {/* Budget History */}
        <div className="history-container">
          <h2>Budget History</h2>
          {budgetHistory.length > 0 ? (
            <ul>
              {budgetHistory.map((item, index) => (
                <li key={index}>$ {item}</li>
              ))}
            </ul>
          ) : (
            <p>No history available.</p>
          )}
        </div>

        {/* Budget Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${(budget / 1000) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
