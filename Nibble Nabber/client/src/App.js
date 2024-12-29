// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import ShoppingList from "./components/ShoppingList";
import CartPage from "./components/CartPage"; // Import CartPage
import { ShoppingListProvider } from "./components/ShoppingListContext";
import { PantryProvider } from './components/PantryContext';
import Pantry from './pages/Pantry';
import Expiry from './pages/Expiry';
import Recipes from './pages/Recipes';
import Budget from './pages/Budget';
import SignUp from './pages/SignUp'
import { BudgetProvider } from './components/BudgetContext'; // Import BudgetProvider

function App() {
  return (
    <ShoppingListProvider>
      <PantryProvider>
        <BudgetProvider> {/* Wrap with BudgetProvider */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/cart" element={<CartPage />} /> {/* Add CartPage Route */}
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/expiry" element={<Expiry />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/budgets" element={<Budget />} /> {/* Budgets page route */}
          </Routes>
        </BudgetProvider>
      </PantryProvider>
    </ShoppingListProvider>
  );
}

export default App;
