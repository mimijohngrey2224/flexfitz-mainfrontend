//with mobile view
import { MdDeleteForever } from "react-icons/md";
import { useContext } from "react";
import EcomContext from "../../context/EcomContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, updateQuantity, removeItem, totalAmount } = useContext(EcomContext);
  // console.log("Image URL:", item.img);
  // console.log(item.img);



  const cartTable = (
    <>
      <div className="overflow-x-auto">
        <table className="w-full max-w-6xl mx-auto mt-10 border-collapse shadow-lg bg-white rounded-2xl hidden sm:table">
          <thead className="bg-gradient-to-r from-blue-50 to-pink-50 text-gray-800 uppercase text-xs tracking-widest">
            <tr>
              <th className="py-4 px-6 text-left">Action</th>
              <th className="py-4 px-6 text-left">Item</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">Quantity</th>
              <th className="py-4 px-6 text-left">Amount</th>
            </tr>
          </thead> 

           <tbody className="text-gray-700 text-sm">
            {cartItems.map((item, index) => (
              <tr
                // key={`${item._id}-${item.size || ""}-${item.color || ""}`}
                 key={`${item._id}-${item.size || "default"}-${item.color || "default"}-${index}`}
                className="border-b hover:bg-gray-100 transition-all duration-200"
              >
                <td className="py-4 px-6">
                  <button
                    onClick={() => removeItem(item._id, item.size, item.color)}
                    className="text-red-500 hover:text-red-700 text-xl transition duration-150"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
                <td className="py-4 px-6 font-semibold">{item.name}</td>
                <td className="py-4 px-6">
                  <img
                    src={`http://localhost:3000/${item.img}`}
                    alt={item.name}
                    className="h-14 w-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </td>
                <td className="py-4 px-6 font-bold text-blue-600">₦{item.price}</td>
                <td className="py-4 px-6">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    step="1"
                    className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => updateQuantity(item._id, e.target.value, item.size, item.color)}
                  />
                </td>
                <td className="py-4 px-6 font-semibold text-gray-800">₦{item.amount}</td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* Mobile View Cards */}
        <div className="sm:hidden flex flex-col gap-4 mt-8">
          {cartItems.map((item, index) => (
            <div
              // key={item.id}
              // key={`${item._id}-${item.size || ""}-${item.color || ""}`}
                key={`${item._id}-${item.size || "default"}-${item.color || "default"}-${index}`}

              className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <button
                  onClick={() => removeItem(item._id, item.size, item.color)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  <MdDeleteForever />
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <img
                  // src={item.img}
                  src={`http://localhost:3000/${item.img}`}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1">
                  <p className="text-blue-600 font-bold">₦{item.price}</p>
                  <div className="flex items-center mt-1">
                    <label className="mr-2 text-sm text-gray-600">Qty:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      step="1"
                      className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={(e) => updateQuantity(item._id, e.target.value, item.size, item.color)} 
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 text-right font-semibold text-gray-800">
                Amount: ₦{item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Total: <span className="text-green-600">₦{totalAmount()}</span>
        </h2>
       <Link to="/checkout">
        <button className="bg-gradient-to-r from-blue-600 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:opacity-90 transition-all duration-200 w-full sm:w-auto">
          Proceed to Checkout
        </button>
       </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6">
        🛒 Your Shopping Cart
      </h1>
      {cartItems.length > 0 ? (
        cartTable
      ) : (
        <div className="text-center mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600">🛍️ Your cart is empty</h2>
          <p className="mt-3 text-gray-500">Start adding premium sportswear for your next session.</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
