import { useState } from "react";
import hat1 from "/hat1.jpg";  // Static images for Men
import hat4 from "/hat4.jpg";
import hat7 from "/hat7.jpg";
import hat5 from "/hat5.jpg";
import rogue from "/rogue.jpg";
import mehat from "/mehat-removebg-preview.png";
import Sbag from "/Sbag.jpg";
import Sbag1 from "/Sbag1.jpg";
import Sbag2 from "/Sbag2.jpg";
import glove from "/glove-removebg-preview.png";
import rogue1 from "/rogue1.jpg"
import { FaAngleDown } from "react-icons/fa";


function MenDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        className="text-white text-lg font-medium flex items-center gap-1 hover:text-pink-400" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ml-1">Men</span>
        <FaAngleDown className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md py-2 w-56 max-h-[400px] overflow-y-auto">
          {/* Grid for Men product images */}
          <div className="grid grid-cols-2 gap-2 px-4">
            <img 
              src={hat1} 
              alt="Men Product 1" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            <img 
              src={hat4} 
              alt="Men Product 2" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            {/* <img 
              src={hat5} 
              alt="Men Product 3" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            /> */}
            <img 
              src={hat7} 
              alt="Men Product 4" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            <img 
              src={rogue} 
              alt="Men Product 5" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            <img 
              src={mehat} 
              alt="Men Product 6" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
             <img 
              src={Sbag} 
              alt="Men Product 6" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
             <img 
              src={Sbag1} 
              alt="Men Product 6" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
             <img 
              src={Sbag2} 
              alt="Men Product 6" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            <img 
              src={glove} 
              alt="Men Product 6" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
            <img 
              src={rogue1} 
              alt="Men Product 6" 
              className="w-full h-24 object-cover rounded-md transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MenDropdown;
