import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";  // External CSS for styles
import PageLogo from "../assets/page.png";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="app-title">Nibble Nabber</h1>
        <p className="app-subtitle">Manage Your Groceries, Effortlessly</p>
      </div>

      <div className="home-content">
        <div className="image-container">
          <img src={PageLogo}  // Add a fitting image of groceries
            alt="Groceries"
            className="hero-image"
          />
        </div>
        
        <div className="home-text">
          <h2>Your Personal Grocery Assistant</h2>
          <p>
            Take control of your pantry and shopping list like never before. Nibble Nabber
            helps you organize, manage, and save on your groceries with smart recommendations
            and real-time updates.
          </p>
          <Link to="/signup">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-item">
          <h3>Track Expirations</h3>
          <p>Never forget when your pantry items expire. Stay on top of your groceries.</p>
        </div>
        <div className="feature-item">
          <h3>Smart Recommendations</h3>
          <p>Get personalized suggestions based on your pantry and shopping habits.</p>
        </div>
        <div className="feature-item">
          <h3>Manage Your Shopping List</h3>
          <p>Effortlessly add, remove, and check off items as you shop.</p>
        </div>
      </div>
      
      <footer className="footer">
        <p>&copy; 2024 Nibble Nabber. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
