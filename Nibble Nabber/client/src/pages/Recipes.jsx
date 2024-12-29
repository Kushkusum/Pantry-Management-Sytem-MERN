import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recipes.css';

const Recipes = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // Fetch pantry items from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/pantry')
      .then(response => setPantryItems(response.data))
      .catch(error => console.error('Error fetching pantry items:', error));
  }, []);

  // Fetch recipes for items expiring soon (within the next week)
  useEffect(() => {
    // Filter items expiring within the next 7 days
    const today = new Date();
    const expiringSoonItems = pantryItems.filter(item => {
      const expiryDate = new Date(item.expiry);
      return expiryDate > today && expiryDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Items expiring within 7 days
    });

    if (expiringSoonItems.length > 0) {
      const ingredients = expiringSoonItems.map(item => item.name).join(',');
      const apiKey = '0944ca6abd3a4c73942a21a441a5d6ce'; // Use your actual Spoonacular API key
      const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

      axios.get(apiUrl)
        .then(response => setRecipes(response.data))
        .catch(error => console.error('Error fetching recipes:', error));
    }
  }, [pantryItems]);

  return (
    <div className="recipes-container">
      <h1>Recipes for Expiring Items</h1>
      {recipes.length === 0 ? (
        <p className="no-recipes">No recipes found for expiring items.</p>
      ) : (
        <div className="recipe-cards-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
              <p>Ingredients: {recipe.usedIngredients.map(ing => ing.name).join(', ')}</p>
              <a
                href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="recipe-link"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
