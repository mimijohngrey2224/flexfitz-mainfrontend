//new with editting
import { useContext, useEffect, useState } from "react";
import EcomContext from "../../context/EcomContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Women() {
  const { WomenData, addToCart, cartItems, user } = useContext(EcomContext);
  const [editableProducts, setEditableProducts] = useState([]);

  useEffect(() => {
    setEditableProducts(WomenData); // Clone data locally for editing
  }, [WomenData]);

  useEffect(() => {
    console.log("Updated Cart Items:", cartItems);
  }, [cartItems]);

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


  //adding wishlist method
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
    <div className="min-h-screen bg-gray-100 py-10 px-6 lg:px-16">
      <div>
        <h1 className="font-bold text-center text-3xl text-gray-800 mb-10">
          Celebrating Women's Sportswear: Style Meets Strength
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Women’s sportswear outfits beautifully blend functionality with fashion, empowering women to perform at their best while looking and feeling confident.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {editableProducts?.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <Link to={`/detail/women/${item._id}`}>
                <img
                  src={`http://localhost:3000/${item.img}`}
                  alt={item.name}
                  className="w-full h-64 object-contain hover:scale-105 transition-transform duration-300 bg-white"
                />
              </Link>
              <span className="absolute top-2 left-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full shadow-md z-10">
                New Arrival
              </span>
            </div>

            <div className="p-4 text-center">
              {/* Editable Name */}
              {user?.role === "admin" ? (
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item._id, "name", e.target.value)}
                  className="text-lg font-semibold text-gray-800 w-full text-center mb-1"
                />
              ) : (
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              )}

              {/* Editable Price */}
              {user?.role === "admin" ? (
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleChange(item._id, "price", e.target.value)}
                  className="text-gray-600 w-full text-center mb-2"
                />
              ) : (
                <p className="text-green-600 mb-2">₦{item.price}</p>
              )}

              {/* Save Button */}
              {user?.role === "admin" && (
                <button
                  onClick={() => handleSave(item._id, { name: item.name, price: item.price })}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded mb-2"
                >
                  Save
                </button>
              )}

              {/* Add to Cart */}
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="mt-2 w-full bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded-full transition-colors duration-300 font-medium"
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

export default Women;
