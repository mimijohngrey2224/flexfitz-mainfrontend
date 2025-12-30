import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("auth-token");

        const res = await fetch(
          `https://flexfitz-api.onrender.com/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setOrder(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Fetch order error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 text-gray-600">
        Order not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="text-sm text-pink-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
          Order Details
        </h1>
        <p className="text-sm text-gray-500">
          Order ID: <span className="text-pink-600">{order._id}</span>
        </p>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow border mb-10">
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold text-lg">{order.status}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-bold text-xl text-pink-600">
            ₦{order.total}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">
            {new Date(order.date).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Items */}
      <h2 className="text-2xl font-bold mb-5">Items</h2>

      <div className="space-y-5">
        {order.items.map((item, index) => {
          const imageSrc = item.image
            ? item.image.startsWith("http")
              ? item.image
              : `https://flexfitz-api.onrender.com/${item.image}`
            : "/ladyst.jpg";

          return (
            <div
              key={index}
              className="flex items-center gap-5 bg-white p-4 rounded-xl shadow border hover:shadow-md transition"
            >
              <img
                src={imageSrc}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/ladyst.jpg";
                }}
              />

              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-gray-600">
                  ₦{item.price} × {item.quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDetails;
