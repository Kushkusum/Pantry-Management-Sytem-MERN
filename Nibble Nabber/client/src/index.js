// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";  // Updated import for React 18
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Create a root element using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app inside the root element
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
