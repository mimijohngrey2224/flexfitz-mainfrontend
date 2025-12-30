import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [ordersData, setOrdersData] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("auth-token");

  axios
    .get("https://flexfitz-api.onrender.com/api/orders/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setOrdersData(res.data);
    })
    .catch((err) => {
      console.error("Error fetching orders", err);
    });
}, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Orders</h2>

      <div className="space-y-6">
        {ordersData.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-md p-4 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm text-gray-500">Order ID:</p>
                <p className="font-medium text-gray-800">{order._id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Order Date:</p>
                <p className="text-gray-700">{order.date}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status:</p>
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
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

            <div className="flex gap-4 mb-3 overflow-x-auto">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 min-w-[150px]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>

            <div className="text-right text-gray-800 font-medium">
              Total: <span className="text-pink-600">{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
