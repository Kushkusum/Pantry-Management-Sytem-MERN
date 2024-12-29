import React from "react";
import "./FeatureCards.css"; // Make sure to add CSS for styling the cards
import ShoppingList from "./ShoppingList"; // Correct relative import


const features = [
  {
    icon: "📝",
    title: "Interactive Shopping Lists",
    description: "Create and manage shopping lists easily, check off items, and track your purchases.",
    component: <ShoppingList />
  },
  {
    icon: "📦",
    title: "Pantry Tracker",
    description: "Keep track of items in your pantry, view quantities, and organize for quick access.",
  },
  {
    icon: "📅",
    title: "Expiry Alerts",
    description: "Get notified when items are nearing expiration, so nothing goes to waste.",
  },
  {
    icon: "🍲",
    title: "Recipe Recommendations",
    description: "Find recipes based on ingredients in your pantry for smart meal planning.",
  },
  {
    icon: "📊",
    title: "Pantry Analytics",
    description: "Analyze your pantry usage to optimize shopping habits and avoid overbuying.",
  },
  {
    icon: "💰",
    title: "Budget Tracker",
    description: "Monitor your grocery spending and stay within your budget with our tracking tool.",
  },
];

function FeatureCards() {
  return (
    <div className="feature-cards-container">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FeatureCards;
