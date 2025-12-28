import { useState } from "react";
import Sbag from "/Sbag.jpg";  // Example static images for Women
import Sbag1 from "/Sbag1.jpg";
import Sbag2 from "/Sbag2.jpg";
import SB1c from "/SB1c.jpg";
import SB4 from "/SB4.jpg";
import sb from "/sb.jpg"
import { FaAngleDown } from "react-icons/fa";

function WomenDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-white text-lg font-medium flex items-center gap-1 hover:text-pink-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ml-1">Women</span>
        <FaAngleDown className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md py-2 w-56 max-h-[400px] overflow-y-auto">
          {/* Grid for Women product images */}
          <div className="grid grid-cols-2 gap-2 px-4">
            <img
              src={Sbag}
              alt="Women Product 1"
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            <img
              src={Sbag1}
              alt="Women Product 2"
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            <img
              src={SB1c}
              alt="Women Product 3"
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            <img
              src={SB4}
              alt="Women Product 4"
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
             <img
              src={Sbag2}
              alt="Women Product 4"
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
             <img
              src={sb}
              alt="Women Product 4"
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WomenDropdown;
