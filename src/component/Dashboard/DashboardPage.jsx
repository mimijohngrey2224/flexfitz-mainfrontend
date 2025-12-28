import { useContext, useState, useEffect } from "react";
import EcomContext from "../../context/EcomContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";


function DashboardPage() {

 const { user, logoutUser, setUser, addToCart } = useContext(EcomContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedFile, setSelectedFile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to access your dashboard");
      navigate("/login");
    }
  }, [user, navigate]);

const fetchWishlist = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    const res = await fetch("http://localhost:3000/api/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ THIS IS THE FIX
      setWishlist(data.products || []);
    } else {
      setWishlist([]);
    }
  } catch (err) {
    console.error("Fetch wishlist error:", err);
    setWishlist([]);
  }
};


useEffect(() => {
  if (activeTab === "wishlist") {
    fetchWishlist();
  }
}, [activeTab]);



  // Fetch orders when orders tab is active
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        if (!token) return;

        const res = await axios.get("http://localhost:3000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      }
    };

    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.warning("Please select an image first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("img", selectedFile);

      const res = await axios.post(
        `http://localhost:3000/api/users/upload-avatar/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Profile image updated!");
      setUser({ ...user, img: res.data.img });
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Try again!");
    }
  };

  if (!user) return null; // prevents rendering before redirect



  

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeTab === "profile" ? "bg-pink-500" : "hover:bg-gray-700"
          }`}
        >
          👤 Profile
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeTab === "orders" ? "bg-pink-500" : "hover:bg-gray-700"
          }`}
        >
          🛒 Orders
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeTab === "wishlist" ? "bg-pink-500" : "hover:bg-gray-700"
          }`}
        >
          ❤️ Saved Items
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 mt-6 rounded hover:bg-red-600"
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* 🌸 Beautified Profile Section */}
        {activeTab === "profile" && (
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              👤 <span>Profile Overview</span>
            </h3>

            <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden">
              {/* Gradient Header */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-pink-500 to-purple-500"></div>

              {/* Profile Image */}
              <div className="relative mt-10 mb-6">
                <img
                  // src={
                  //   user.img
                  //     ? `http://localhost:3000/${user.img}`
                  //     : "/default-avatar.png"
                  // }

                  src={
                    user.img?.startsWith("http")
                    ? user.img
                    : `http://localhost:3000/${user.img}`
                  }

                  alt="User Avatar"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />

                {/* Upload Button */}
                <form
                  onSubmit={handleImageUpload}
                  className="absolute bottom-0 right-0 bg-pink-500 hover:bg-pink-600 text-white text-xs px-2 py-1 rounded-md cursor-pointer shadow-md transition"
                >
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="hidden"
                    />
                    📸 Change
                  </label>
                  {selectedFile && (
                    <button
                      type="submit"
                      className="block mt-1 text-[10px] text-white underline"
                    >
                      Upload
                    </button>
                  )}
                </form>
              </div>

              {/* Profile Info */}
              <div className="space-y-3 text-gray-700 mt-4">
                <p className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm">
                  📞{" "}
                  <span className="font-medium">
                    {user.phone || "Not provided"}
                  </span>
                </p>
              </div>

              {/* Divider */}
              <div className="my-6 border-t w-full border-gray-200"></div>

              {/* Account Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  🏠 Go Home
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🛒 Your Orders
            </h3>

            <div className="bg-white p-6 rounded-lg shadow-md">
              {orders.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  No orders yet. Once you make a purchase, it will appear here.
                </p>
              ) : (
                <ul className="space-y-6">
                  {orders.map((order) => (
                    <li
                      key={order._id}
                      className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            Order ID:{" "}
                            <span className="text-pink-600">{order._id}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Date:</strong>{" "}
                            {new Date(order.date).toLocaleString()}
                          </p>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Order Total */}
                      <p className="text-gray-800 mb-3">
                        <strong>Total:</strong>{" "}
                        <span className="text-pink-600 font-bold">
                          ₦{order.total}
                        </span>
                      </p>

                      //new 
                      {/* Order Items */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm border border-gray-100"
                    >
                      <img
                        src={
                          item.image
                            ? item.image.startsWith("http")
                              ? item.image
                              : `http://localhost:3000/${item.image}`
                            : "/ladyst.jpg"
                        }
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/ladyst.jpg";
                        }}
                      />

                      <div>
                        <p className="text-gray-800 font-medium">{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ✅ Order-level action */}
                <div className="mt-4 text-right">
                  <Link to={`/orders/${order._id}`}>
                    <button className="text-pink-600 font-semibold hover:underline">
                      View Order Details →
                    </button>
                  </Link>
                </div>

                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {activeTab === "wishlist" && (
  <div className="max-w-5xl mx-auto">
    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      ❤️ <span>Saved Items</span>
    </h3>

    <div className="bg-white shadow-lg rounded-xl p-8">
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          You haven’t saved any items yet. 💕
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.productId}
              className="group relative bg-gradient-to-b from-pink-50 to-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
              
                <img
                  src={
                    item.image
                      ? `http://localhost:3000/${item.image}`
                      : "/ladyst.jpg"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/ladyst.jpg";
                  }}
                />
   
              </div>

              {/* Product Info */}
              <div className="space-y-2 text-center">
                <p className="text-gray-800 font-semibold text-lg truncate">
                  {item.name}
                </p>
                <p className="text-pink-600 font-bold">₦{item.price}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-center gap-3">

                <button
                  onClick={() =>
                    addToCart({
                      _id: item.productId,
                      name: item.name,
                      price: item.price,
                      // img: item.image,
                      image: item.img,
                    })
                  }
                  className="px-4 py-2 text-sm font-medium bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("auth-token");

                      await fetch(
                        `http://localhost:3000/api/wishlist/${item.productId}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      setWishlist((prev) =>
                        prev.filter((w) => w.productId !== item.productId)
                      );
                    } catch (err) {
                      console.error("Remove wishlist error:", err);
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  ❌ Remove
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}


      </div>
    </div>
  );
}

export default DashboardPage;



