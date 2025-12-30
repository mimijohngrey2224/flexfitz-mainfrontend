import { useContext } from "react";
import EcomContext from "../../context/EcomContext";

function Checkout() {
  const { cartItems, totalAmount, handleCheckout } = useContext(EcomContext);

  const onSubmit = (e) => {
    e.preventDefault();

    // Capture form values
    const fullName = e.target.fullName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const address = e.target.address.value;

    // Send all info to handleCheckout
    handleCheckout(totalAmount(), "NGN", email, {
      fullName,
      phone,
      address,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-12 px-4 sm:px-8 lg:px-24">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
        🧾 Checkout Summary
      </h1>

      {/* Desktop Table View */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full max-w-6xl mx-auto border-collapse shadow-xl bg-white rounded-2xl hidden sm:table">
          <thead className="bg-gradient-to-r from-blue-200 to-pink-200 text-gray-800 uppercase text-xs tracking-widest">
            <tr>
              <th className="py-4 px-6 text-left">Item</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">Quantity</th>
              <th className="py-4 px-6 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {cartItems.map((item) => (
              <tr key={item._id} className="border-b hover:bg-blue-50 transition-all duration-200">
                <td className="py-4 px-6 font-semibold">{item.name}</td>
                <td className="py-4 px-6">
                  <img
                    src={`https://flexfitz-api.onrender.com/${item.img}`}
                    alt={item.name}
                    className="h-14 w-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </td>
                <td className="py-4 px-6 font-bold text-blue-600">₦{item.price}</td>
                <td className="py-4 px-6">
                  <input
                    type="text"
                    value={item.quantity}
                    className="w-16 text-center border border-gray-300 rounded-md py-1 px-2"
                    readOnly
                  />
                </td>
                <td className="py-4 px-6 font-semibold text-gray-800">₦{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="sm:hidden flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={`https://flexfitz-api.onrender.com/${item.img}`}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <p className="text-base font-semibold">{item.name}</p>
                  <p className="text-blue-600 font-bold text-sm">₦{item.price}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-gray-800 font-medium mt-1">Total: ₦{item.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Amount */}
      <div className="w-full max-w-6xl mx-auto mb-12 flex flex-col sm:flex-row justify-between items-center gap-6 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Total Amount: <span className="text-green-600">₦{totalAmount()}</span>
        </h2>
      </div>

      {/* Checkout Form */}
      <div className="bg-white max-w-3xl mx-auto shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Enter Your Details
        </h3>

        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+234 812 345 6789"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
            <textarea
              name="address"
              rows="3"
              placeholder="123 Sport Street, Lagos, Nigeria"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition duration-200"
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

