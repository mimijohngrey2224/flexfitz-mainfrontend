      import { useContext } from 'react';
      import { useParams } from 'react-router-dom';
      import EcomContext from '../../context/EcomContext';

      function Detail() {
        const { id, category } = useParams();
        
        const { menSecond, WomenData, shoes, addToCart } = useContext(EcomContext);

      let item;
      if (category === "women") {
        item = WomenData.find((product) => product._id.toString() === id.toString());
      } else if (category === "men") {
        item = menSecond.find((product) => product._id.toString() === id.toString());
      } else if (category === "shoes") {
        item = shoes.find((product) => product._id.toString() === id.toString());
      }


      console.log("Looking for item ID:", id, "in category:", category);
      console.log("Matched item:", item);

   
      if (!item) {
        return (
          <div className="text-center py-20 text-2xl font-semibold text-gray-500">
            Product not found.
          </div>
        );
      }


      const handleAddToCart = () => {
      const quantity = 1;

      // Optional defaults in case the product doesn't have size/color selected
      const productToAdd = {
        ...item,
        quantity,
        size: item.size || "default",  // or prompt user to select
        color: item.color || "default", // optional
        amount: item.price * quantity,
      };

      addToCart(productToAdd);
    };


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-6 md:p-10 shadow-xl rounded-lg">
        {/* Left: Image */}
        <div className="relative group">
          <img
            src={"http://localhost:3000/" + item?.img}
            // src={`${url}/uploads/${item.img}`}
            alt={item.name}
            className="rounded-lg w-full object-cover shadow-lg transform group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            NEW
          </span>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              {item.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Push your limits in the gym with our latest performance gear. Designed with advanced moisture-wicking fabric and a seamless, flexible fit, this gymwear is made for movement and motivation.
            </p>

            <ul className="text-sm text-gray-700 mb-6 space-y-2">
              <li>✓ Breathable and sweat-resistant fabric</li>
              <li>✓ Ergonomic stretch for full range of motion</li>
              <li>✓ Durable for high-intensity training</li>
              <li>✓ Lightweight and stylish for everyday wear</li>
            </ul>

            <div className="text-3xl font-semibold text-green-600 mb-6">
              ₦{item.price}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 px-6 rounded-md text-lg font-medium transition-all duration-300 shadow-md"
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default Detail;

