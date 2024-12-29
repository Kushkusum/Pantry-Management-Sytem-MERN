import React, { useEffect } from "react";

function AddItemForm({
  handleGrocerySubmit,
  handleGroceryInputChange,
  handleProductInputChange,
  handlePurchaseInputChange,
  handleSupplierInputChange,
  showModal,
  groceryError,
  modalRef,
  closeModal,
  openModal


}) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-10/12 mt-2 rounded-xl h-24 bg-white text-center">
        <h1 className="text-4xl font-bold">Grocery Management System</h1>
        <button
          onClick={openModal}
          className="rounded-md p-1 w-5/12 mt-3 bg-white text-green-800 font-bold text-xl cursor-pointer text-center border border-green-700 no-underline hover:bg-green-700 hover:text-white"
        >
          ADD GROCERY
        </button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div ref={modalRef} className="bg-white p-8 rounded-md w-9/12 h-4/5">
            <div className="flex justify-center text-center">
              <h2 className="text-2xl font-bold mb-4">Add Grocery Details</h2>
            </div>
            <form onSubmit={handleGrocerySubmit}>
              <div className="flex justify-between">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  className="block w-56 border border-gray-300 rounded-md p-2 mb-2"
                  onChange={handleGroceryInputChange}
                  required
                />
                <input
                  type="number"
                  id="quantity"
                  placeholder="Enter Grocery Quantity"
                  className="block w-56 border border-gray-300 rounded-md p-2 mb-2"
                  onChange={handleGroceryInputChange}
                  required
                />
                <input
                  type="text"
                  id="category"
                  placeholder="Enter Grocery Category"
                  className="block w-56 border border-gray-300 rounded-md p-2 mb-2"
                  onChange={handleGroceryInputChange}
                  required
                />
                <input
                  type="number"
                  id="price"
                  placeholder="Enter Grocery Price"
                  className="block w-56 border border-gray-300 rounded-md p-2 mb-2"
                  onChange={handleGroceryInputChange}
                  required
                />
              </div>
              <div className="flex justify-between mt-5">
                <div className="w-56 h-56">
                  <div className="flex justify-center text-center">
                    <h1 className="font-semibold text-lg">Supliar Details</h1>
                  </div>
                  <input
                    type="number"
                    id="name"
                    placeholder="Enter Phone Number"
                    className="block w-56 border mt-3 border-gray-300 rounded-md p-2 mb-2"
                    onChange={handleSupplierInputChange}
                    required
                  />
                  <input
                    type="text"
                    id="contact"
                    placeholder="Enter Contact"
                    className="block w-56 border mt-3 border-gray-300 rounded-md p-2 mb-2"
                    onChange={handleSupplierInputChange}
                    required
                  />
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter Address"
                    className="block w-56 border mt-3 border-gray-300 rounded-md p-2 mb-2"
                    onChange={handleSupplierInputChange}
                    required
                  />
                </div>
                <div className="w-56 h-56">
                  <div className="flex justify-center text-center">
                    <h1 className="font-semibold text-lg">Product Details</h1>
                  </div>
                  <input
                    type="number"
                    id="barcode"
                    placeholder="Enter barcode"
                    className="block w-56 border mt-3 border-gray-300 rounded-md p-2 mb-2"
                    onChange={handleProductInputChange}
                    required
                  />
                  <input
                    type="text"
                    id="brand"
                    placeholder="Enter brand"
                    className="block w-56 border mt-3 border-gray-300 rounded-md p-2 mb-2"
                    onChange={handleProductInputChange}
                    required
                  />
                  <input
                    type="number"
                    id="weightVolume"
                    placeholder="Enter WeightVolume"
                    className="block w-56 border mt-3 border-gray-300 rounded-md p-2 mb-2"
                    onChange={handleProductInputChange}
                    required
                  />
                </div>
                <div className="w-56 h-56 ">
                  <div className="flex justify-center text-center">
                    <h1 className="font-semibold text-lg">Purchase Details</h1>
                  </div>
                  <input
                    type="number"
                    id="purchasePrice"
                    placeholder="Enter Purchase Price"
                    className="block w-56 border mt-3 border-gray-300 rounded-md p-2 mb-2"
                    onChange={handlePurchaseInputChange}
                    required
                  />
                  <input
                    type="number"
                    id="purchaseOrderNumber"
                    placeholder="Enter Purchase Order Number"
                    className="block w-56 mt-3 border border-gray-300 rounded-md p-2 mb-2"
                    onChange={handlePurchaseInputChange}
                    required
                  />
                  <input
                    type="date"
                    placeholder="Enter Current Date (optional)"
                    className="block w-56 border mt-3 border-gray-300 rounded-md p-2 mb-2"
                    onChange={handlePurchaseInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-center text-center">
                {groceryError && (
                  <p className="text-red-700 font-light text-sm">
                    {groceryError}
                  </p>
                )}
              </div>
              <div className="flex justify-center text-center mt-5">
                <button
                  type="submit"
                  className="rounded-md p-1 w-5/12 mt-3 text-green-800 font-bold text-xl cursor-pointer text-center border border-green-700 no-underline hover:bg-green-700 hover:text-white"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddItemForm;
