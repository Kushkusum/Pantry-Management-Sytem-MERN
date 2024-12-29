import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import AddItemForm from "../components/AddItemForm";
import GroceryList from "../components/GroceryList";
import { API } from "../services/api";
import Cookies from "js-cookie";

function Inventory() {
  const [groceryData, setGroceryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groceryError, setGroceryError] = useState("");
  const modalRef = useRef();

  const initialGroceryItemData = {
    name: "",
    quantity: "",
    category: "",
    price: "",
    supplier: {
      phoneNumber: "",
      contact: "",
      address: "",
    },
    productDetails: {
      barcode: "",
      brand: "",
      weightVolume: "",
    },
    purchaseDetails: {
      purchasePrice: "",
      purchaseOrderNumber: "",
      currentDate: "",
    },
  };

  const [groceryItemData, setGroceryItemData] = useState(
    initialGroceryItemData
  );

  const handleGroceryInputChange = (e) => {
    setGroceryError("");
    const { id, value } = e.target;
    setGroceryItemData({
      ...groceryItemData,
      [id]: value,
    });
  };

  const handleSupplierInputChange = (e) => {
    setGroceryError("");
    const { id, value } = e.target;
    setGroceryItemData({
      ...groceryItemData,
      supplier: {
        ...groceryItemData.supplier,
        [id]: value,
      },
    });
  };

  const handleProductInputChange = (e) => {
    setGroceryError("");
    const { id, value } = e.target;
    setGroceryItemData({
      ...groceryItemData,
      productDetails: {
        ...groceryItemData.productDetails,
        [id]: value,
      },
    });
  };

  const handlePurchaseInputChange = (e) => {
    setGroceryError("");
    const { id, value } = e.target;
    setGroceryItemData({
      ...groceryItemData,
      purchaseDetails: {
        ...groceryItemData.purchaseDetails,
        [id]: value,
      },
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setGroceryError("");
  };
  const fetchGroceryData = async () => {
    try {
      const response = await API.getGroceryItems();
      setGroceryData(response.data);
    } catch (error) {
      console.error("Error fetching grocery data:", error);
    }
  };

  useEffect(() => {
    fetchGroceryData();
  }, []);

  const handleGrocerySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.addGroceryItem(groceryItemData);
      console.log("Grocery item added:", response);
      setGroceryItemData(initialGroceryItemData);
      fetchGroceryData();
      closeModal();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setGroceryError(error.response.data.error);
      } else if (error.message) {
        setGroceryError(error.message);
      } else {
        setGroceryError("An error occurred");
      }
    }
  };

  return (
    <div className="h-screen border bg-gradient-to-r from-gray-400 via-fushia-500 to-indigo-300 md:w-full lg:w-full w-full">
      <Navbar />
      <AddItemForm
        handleGrocerySubmit={handleGrocerySubmit}
        handleGroceryInputChange={handleGroceryInputChange}
        handleSupplierInputChange={handleSupplierInputChange}
        handleProductInputChange={handleProductInputChange}
        handlePurchaseInputChange={handlePurchaseInputChange}
        showModal={showModal}
        groceryError={groceryError}
        modalRef={modalRef}
        closeModal={closeModal}
        openModal={openModal}
      />
      <GroceryList
        groceryData={groceryData}
        showModal={showModal}
        setGroceryError={setGroceryError}
        groceryError={groceryError}
        modalRef={modalRef}
        fetchGroceryData={fetchGroceryData}
        closeModal={closeModal}
        openModal={openModal}
        setGroceryData={setGroceryData}
      />
    </div>
  );
}

export default Inventory;
