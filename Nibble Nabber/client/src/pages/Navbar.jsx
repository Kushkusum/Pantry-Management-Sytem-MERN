import React, { useState, useEffect } from "react";
import AppLogo from "../assets/app-logo.png";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for active link handling
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon
import { useShoppingList } from "../components/ShoppingListContext"; // Import the custom hook to access shopping list
import { usePantry } from "../components/PantryContext"; // Import the custom hook for pantry

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { items } = useShoppingList(); // Get the shopping list items
  const { pantryItems } = usePantry(); // Get the pantry items

  const location = useLocation(); // Hook to get the current route

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 500) {
        // Add any responsive adjustments here if needed
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Helper function to check if the link is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div className="MainNavbar flex justify-between bg-[#ebe2e0] md:w-full lg:w-full w-full h-16 mx-auto top-0 shadow-md font-sans rounded-bl-5 rounded-br-5 backdrop-blur z-10 m-auto sticky">
      <div className="Logo mt-2 ml-10 transition-opacity h-18 duration-300 ease-in-out">
        <Link to="/">
          <img
            className="mt-[-8px] ml-1"
            src={AppLogo}
            alt="App Logo"
            width={300}
            height={250}
          />
        </Link>
      </div>

      <div className="desk-navbar flex justify-between items-center lg:w-70 w-2/5">
        <Link
          className={`no-underline w-24 h-8 rounded-full font-plusjakartasans text-[#2d2d2d] text-md font-semibold border border-transparent 
          ${isActiveLink("/") ? "active" : "hover:border-[#ff6a88] hover:text-black hover:bg-[#ffebef]"} transition duration-300 flex items-center justify-center`}
          to="/"
        >
          HOME
        </Link>

        <Link
          className={`no-underline w-24 h-8 rounded-full font-plusjakartasans text-[#2d2d2d] text-md font-semibold border border-transparent
          ${isActiveLink("/shopping-list") ? "active" : "hover:border-[#ff6a88] hover:text-black hover:bg-[#ffebef]"} transition duration-300 flex items-center justify-center`}
          to="/shopping-list"
        >
          UPDATE
        </Link>

        <Link
          className={`no-underline w-24 h-8 rounded-full font-plusjakartasans text-[#2d2d2d] text-md font-semibold border border-transparent
          ${isActiveLink("/pantry") ? "active" : "hover:border-[#ff6a88] hover:text-black hover:bg-[#ffebef]"} transition duration-300 flex items-center justify-center`}
          to="/pantry"
        >
          PANTRY
        </Link>

        <Link
          className={`no-underline w-24 h-8 rounded-full font-plusjakartasans text-[#2d2d2d] text-md font-semibold border border-transparent
          ${isActiveLink("/expiry") ? "active" : "hover:border-[#ff6a88] hover:text-black hover:bg-[#ffebef]"} transition duration-300 flex items-center justify-center`}
          to="/expiry"
        >
          EXPIRY
        </Link>

        <Link
          className={`no-underline w-24 h-8 rounded-full font-plusjakartasans text-[#2d2d2d] text-md font-semibold border border-transparent
          ${isActiveLink("/recipes") ? "active" : "hover:border-[#ff6a88] hover:text-black hover:bg-[#ffebef]"} transition duration-300 flex items-center justify-center`}
          to="/recipes"
        >
          RECIPES
        </Link>

        <Link
          className={`no-underline w-24 h-8 rounded-full font-plusjakartasans text-[#2d2d2d] text-md font-semibold border border-transparent
          ${isActiveLink("/budgets") ? "active" : "hover:border-[#ff6a88] hover:text-black hover:bg-[#ffebef]"} transition duration-300 flex items-center justify-center`}
          to="/budgets"
        >
          BUDGETS
        </Link>
      </div>

      {/* Cart icon with shopping list count */}
      <div className="mr-10 mt-3 w-24 h-12 flex items-center justify-center">
        <Link to="/cart">
          <div className="relative">
            <FaShoppingCart size={24} className="text-[#2d2d2d]" />
            {items.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#ff6a88] text-white text-xs rounded-full px-2 py-1">
                {items.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
