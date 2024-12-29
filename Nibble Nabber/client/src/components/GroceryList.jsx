import React from "react";
import { API } from "../services/api";

function GroceryList({ groceryData,fetchGroceryData ,setGroceryError,groceryError,setGroceryData}) {

  const handleEdit = (id) => {
    try {
      console.log("Edit item with ID:", id);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      const response = await API.deleteGroceryItem(id);
      console.log('Deleted Successfully', response)
      fetchGroceryData();
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
    <div className="flex justify-center">
      <div className="w-10/12 mt-2 rounded-xl h-24 text-center">
        <table className="w-full">
          <thead className="bg-white">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Product</th>
              <th className="p-2">Expiry</th>
              <th className="p-2">Recipes</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groceryData.map((item) => (
              <tr
                key={item.id}
                className="border rounded-b-2xl"
              >
                <td className="p-2 rounded-t-2xl">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.price}</td>
                <td className="text-sm font-thin ml-4">
                  <p>Name: {item.supplier.name}</p>
                  <p>Contact: {item.supplier.contact}</p>
                  <p>Address: {item.supplier.address}</p>
                </td>
                <td className="text-sm font-thin ml-4">
                  <p>Barcode: {item.productDetails.barcode}</p>
                  <p>Brand: {item.productDetails.brand}</p>
                  <p>Weight/Volume: {item.productDetails.weightVolume}</p>
                </td>
                <td className="text-sm font-thin ml-4 border-b">
                  <p>Purchase Price: {item.purchaseDetails.purchasePrice}</p>
                  <p>
                    Order Number: {item.purchaseDetails.purchaseOrderNumber}
                  </p>
                  <p>
                    Purchase Date:{" "}
                    {new Date(
                      item.purchaseDetails.purchaseDate
                    ).toLocaleDateString()}
                  </p>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroceryList;
