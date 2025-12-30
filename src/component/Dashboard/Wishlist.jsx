import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';

function Wishlist({ user }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user?._id) {
      axios.get(`https://flexfitz-api.onrender.com/api/users/${user._id}/wishlist`)
        .then(res => setWishlist(res.data.products || []))
        .catch(() => setWishlist([]));
    }
  }, [user]);

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`https://flexfitz-api.onrender.com/api/users/${user._id}/wishlist/${id}`);
      setWishlist(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  const moveToCart = (id) => {
    console.log(`Moved item ${id} to cart`);
    removeFromWishlist(id);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          Your wishlist is empty. 💔
        </div>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-md object-cover border"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-pink-600 font-semibold">{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => moveToCart(item._id)}
                  className="flex items-center gap-2 text-white bg-pink-600 px-4 py-2 rounded-md text-sm hover:bg-pink-700 transition"
                >
                  <FaShoppingCart />
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

