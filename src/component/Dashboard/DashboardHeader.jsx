// import React from 'react';
// import { FaBell } from 'react-icons/fa';

// function DashboardHeader() {
//   return (
//     <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm rounded-md">
//       {/* Page Title */}
//       <h1 className="text-2xl font-semibold text-gray-800">
//         Dashboard
//       </h1>

//       {/* Right Side */}
//       <div className="flex items-center space-x-4">
//         {/* Optional: Search Bar */}
//         <input
//           type="text"
//           placeholder="Search orders or items..."
//           className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
//         />

//         {/* Notification Icon */}
//         <div className="relative">
//           <FaBell className="text-gray-600 text-lg cursor-pointer hover:text-pink-500" />
//           <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//             3
//           </span>
//         </div>

//         {/* User Avatar */}
//         <div className="flex items-center space-x-2">
//           <img
//             src="https://i.pravatar.cc/40" // Placeholder avatar
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full border-2 border-pink-500"
//           />
//           <div className="text-sm text-gray-700">
//             <p className="font-medium">Hi, Sarah</p>
//             <p className="text-xs text-gray-500">Customer</p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default DashboardHeader;


// import { useContext, useState } from "react";
// import EcomContext from "../../context/EcomContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function DashboardHeader() {
//   const { user, logoutUser } = useContext(EcomContext);
//   const [activeTab, setActiveTab] = useState("profile");
//   const navigate = useNavigate();

//   // If user not logged in, show message and redirect
//   if (!user) {
//     toast.error("Please login to access your dashboard");
//     navigate("/login");
//     return null;
//   }

//   const handleLogout = () => {
//     logoutUser();
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-full lg:w-1/4 bg-gray-800 text-white p-6 space-y-4">
//         <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>
//         <button
//           onClick={() => setActiveTab("profile")}
//           className={`w-full text-left px-4 py-2 rounded ${
//             activeTab === "profile" ? "bg-pink-500" : "hover:bg-gray-700"
//           }`}
//         >
//           👤 Profile
//         </button>
//         <button
//           onClick={() => setActiveTab("orders")}
//           className={`w-full text-left px-4 py-2 rounded ${
//             activeTab === "orders" ? "bg-pink-500" : "hover:bg-gray-700"
//           }`}
//         >
//           🛒 Orders
//         </button>
//         <button
//           onClick={() => setActiveTab("wishlist")}
//           className={`w-full text-left px-4 py-2 rounded ${
//             activeTab === "wishlist" ? "bg-pink-500" : "hover:bg-gray-700"
//           }`}
//         >
//           ❤️ Saved Items
//         </button>

//         <button
//           onClick={handleLogout}
//           className="w-full text-left px-4 py-2 mt-6 rounded hover:bg-red-600"
//         >
//           🚪 Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {activeTab === "profile" && (
//           <div>
//             <h3 className="text-xl font-bold mb-4">👤 Profile Information</h3>
//             <div className="bg-white p-6 rounded shadow-md max-w-md">
//               <p>
//                 <strong>Name:</strong> {user.firstName} {user.lastName}
//               </p>
//               <p>
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {user.phone || "N/A"}
//               </p>
//             </div>
//           </div>
//         )}

//         {activeTab === "orders" && (
//           <div>
//             <h3 className="text-xl font-bold mb-4">🛒 Your Orders</h3>
//             <div className="bg-white p-6 rounded shadow-md">
//               <p>No orders yet. Once you purchase, they’ll appear here.</p>
//             </div>
//           </div>
//         )}

//         {activeTab === "wishlist" && (
//           <div>
//             <h3 className="text-xl font-bold mb-4">❤️ Saved Items</h3>
//             <div className="bg-white p-6 rounded shadow-md">
//               <p>Your saved items will appear here soon.</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DashboardHeader;

