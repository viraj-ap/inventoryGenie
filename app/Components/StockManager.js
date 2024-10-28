"use client";
import { useState, useEffect } from "react";

export default function StockManager() {
  const [stock, setStock] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  // Fetch stock data from MongoDB
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("/api/product");
        if (response.ok) {
          const data = await response.json();
          setStock(data); // Set stock state with data from MongoDB
        } else {
          console.error("Failed to fetch stock data.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStockData();
  }, []);

  // Function to add a product by sending data to /api/product endpoint
  const addProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if all required fields have values
    if (!productForm.name || !productForm.quantity || !productForm.price) {
      console.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setStock([...stock, newProduct.product]); // Update stock with new product
        setProductForm({ name: "", quantity: "", price: "" }); // Clear the form
      } else {
        console.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to delete a product
  const deleteProduct = async (id) => {
    const response = await fetch("/api/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setStock((prevStock) => prevStock.filter((product) => product._id !== id));
      console.log("Product deleted successfully");
    } else {
      const errorData = await response.json();
      console.error("Failed to delete product:", errorData.error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // Filter stock based on search query
  const filteredStock = stock.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-4 bg-black min-h-screen">
      {/* Search Input */}
      <div className="w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="Search product by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 bg-gray-900 text-white"
        />
      </div>

      {/* Add Product Form */}
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Add a Product</h2>
        <form onSubmit={addProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Product Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={productForm.name}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Quantity</label>
            <input
              onChange={handleChange}
              type="number"
              name="quantity"
              value={productForm.quantity}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Price</label>
            <input
              onChange={handleChange}
              type="number"
              name="price"
              value={productForm.price}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 bg-gray-900 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-300"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Display Current Stock */}
      <div className="mt-10 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Current Stock</h2>
        {filteredStock.length > 0 ? (
          <table className="w-full bg-gray-800 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-700 text-left text-gray-200">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th> {/* Added Actions Column */}
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((product, index) => (
                <tr key={index} className="border-t border-gray-600">
                  <td className="px-4 py-2 text-gray-300">{product.name}</td>
                  <td className="px-4 py-2 text-gray-300">{product.quantity}</td>
                  <td className="px-4 py-2 text-gray-300">₹{product.price}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No products available in stock.</p>
        )}
      </div>
    </div>
  );
}
