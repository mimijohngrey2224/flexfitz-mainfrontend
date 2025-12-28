// new code with editting methods

import { useContext, useEffect, useState } from "react";
import EcomContext from "../context/EcomContext";
import { Link } from "react-router-dom";
import axios from "axios";

function MenSecond() {
  const { menSecond, addToCart, cartItems, user } = useContext(EcomContext);
  const [editableProducts, setEditableProducts] = useState([]);

  useEffect(() => {
    setEditableProducts(menSecond); // Clone original data into local state
  }, [menSecond]);

  const handleChange = (id, field, value) => {
    setEditableProducts((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async (id, updatedFields) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/product/${id}`, updatedFields);
      console.log("Update successful:", response.data);
      alert("Product updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  const addToWishlist = async (item) => {
  try {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      alert("Please login to save items");
      return;
    }

    const res = await fetch("http://localhost:3000/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.img,

        // image: item.img, // IMPORTANT: img, not image
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to save item");
    } else {
      alert("Saved to wishlist ❤️");
    }
  } catch (err) {
    console.error("Add to wishlist error:", err);
  }
};


  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
          High-Performance Men's Gymwear
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Crafted for endurance, flexibility, and comfort. Dominate every workout with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {editableProducts?.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl bg-white p-5 shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <Link to={`/detail/men/${item._id}`}>
                <img
                  src={`http://localhost:3000/${item.img}`} 
                  alt={item.name}
                  className="w-full h-54 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                New Arrival
              </span>

              {/* Editable Name */}
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChange(item._id, "name", e.target.value)}
                className="text-xl font-bold text-gray-800 mb-1 text-center w-full"
              />
              <input
                type="text"
                readOnly
                value={`₦${item.price.toLocaleString()}`}
                className="text-lg text-green-600 font-semibold text-center w-full"
              />

             {user?.role === "admin" && (
            <button
              onClick={() => handleSave(item._id, { name: item.name, price: item.price })}
              className="mt-2 bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded"
            >
              Save
            </button>
          )}


              {/* Add to Cart */}
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="mt-4 w-full bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded-full transition-colors duration-300 font-medium"
              >
                Add to Cart
              </button>

              <button
              onClick={() => addToWishlist(item)}
              className="mt-2 w-full border border-pink-500 text-pink-600 py-2 px-4 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              ❤️ Save Item
            </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenSecond;
