//with name and price editing method
import { useContext, useEffect, useState } from 'react';
import EcomContext from '../../context/EcomContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Shoes() {
  const { shoes, addToCart, cartItems, user } = useContext(EcomContext);

  const [editableShoes, setEditableShoes] = useState([]);

  useEffect(() => {
    setEditableShoes(shoes); // Sync initial data
  }, [shoes]);

  const handleChange = (id, field, value) => {
    setEditableShoes((prev) =>
      prev.map((item) => (item._id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async (id, updatedFields) => {
    try {
      const response = await axios.put(`https://flexfitz-api.onrender.com/api/product/${id}`, updatedFields);
      console.log("Update successful:", response.data);
      alert("Product updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  // Separate items with video and images
  const videoItems = editableShoes?.filter((item) => item.video);
  const imageItems = editableShoes?.filter((item) => item.img);


  //adding wishlist method
  const addToWishlist = async (item) => {
  try {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      alert("Please login to save items");
      return;
    }

    const res = await fetch("https://flexfitz-api.onrender.com/api/wishlist", {
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
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Hottest Drop of the Season
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Sneakers are more than just footwear — they’re a lifestyle.
      </p>

      {/* Video Row */}
      <div className="mb-12">
        {videoItems?.map((item, index) => (
          <div
            key={`video-${item._id || index}`}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl mb-8"
          >
            <Link to={`/detail/shoes/${item._id}`}>
              <div className="w-full aspect-video bg-black">
                <video
                  src={`https://flexfitz-api.onrender.com/${item.video}`}
                  className="w-full h-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </Link>

            <div className="p-4 text-center">
              {user?.role === 'admin' ? (
                <>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleChange(item._id, 'name', e.target.value)}
                    className="text-xl font-semibold text-gray-800 w-full mb-2 text-center"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleChange(item._id, 'price', e.target.value)}
                    className="text-gray-600 w-full text-center mb-2"
                  />
                  <button
                    onClick={() => handleSave(item._id, { name: item.name, price: item.price })}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded mb-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-green-600 mb-3">₦{item.price}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {imageItems?.map((item, index) => (
          <div
            key={`image-${item._id || index}`}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl"
          >
            <Link to={`/detail/shoes/${item._id}`}>
              <img
                src={`https://flexfitz-api.onrender.com/${item.img}`}
                alt={item.name}
                className="w-full h-73 object-cover"
              />
            </Link>
            <div className="p-4 text-center relative">
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full z-10">
                New Arrival
              </span>

              {user?.role === 'admin' ? (
                <>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleChange(item._id, 'name', e.target.value)}
                    className="text-xl font-semibold text-gray-800 mb-2 text-center w-full mt-6"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleChange(item._id, 'price', e.target.value)}
                    className="text-gray-600 mb-2 w-full text-center"
                  />
                  <button
                    onClick={() => handleSave(item._id, { name: item.name, price: item.price })}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded mb-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1 mt-6">{item.name}</h3>
                  <p className="text-green-600 mb-3">₦{item.price}</p>
                </>
              )}

              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                Add to Cart
              </button>

              <button
              onClick={() => addToWishlist(item)}
              className="mt-2 border border-pink-500 text-pink-600 px-5 py-2 rounded-full hover:bg-pink-500 hover:text-white transition"
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

export default Shoes;
