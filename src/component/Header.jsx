//new 5 novermber 2025
import avatar from "/avatar.png";
import ladelogoM from "/ladelogoM-removebg-preview.png";
import { FaCartArrowDown } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { IoMan } from "react-icons/io5";
import { GrRestroomWomen } from "react-icons/gr";
import { GiRunningShoe } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import MenDropdown from "./MenDropdown";
import WomenDropdown from "./pages/WomenDropdown";
import EcomContext from "../context/EcomContext";

function Header() {
  const [open, setOpen] = useState(false);
  const { cartItems, user, logoutUser } = useContext(EcomContext);
  const navigate = useNavigate();

  // Handle logout + redirect
  const handleLogout = () => {
    logoutUser();
    setOpen(false); // close mobile menu if open
    navigate("/"); // redirect to homepage
  };

  return (
    <div className="flex items-center justify-between py-4 px-5 lg:px-10 bg-gray-800 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">FLEXFITZ</h1>
        <img src={ladelogoM} alt="FlexFitz Logo" className="w-[200px] h-[150px]" />
      </div>

      {/* Center Navigation */}
      <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">
        {/* Men */}
        <div className="flex flex-col items-center">
          <Link className="text-white text-lg font-medium hover:text-pink-400 flex items-center" to="/">
            <IoMan />
            <span className="ml-1">Men</span>
          </Link>
          <div className="mt-2">
            <MenDropdown />
          </div>
        </div>

        {/* Women */}
        <div className="flex flex-col items-center">
          <Link className="text-white text-lg font-medium hover:text-pink-400 flex items-center" to="/women">
            <GrRestroomWomen />
            <span className="ml-1">Women</span>
          </Link>
          <div className="mt-2">
            <WomenDropdown />
          </div>
        </div>

        {/* Shoes */}
        <Link className="text-white text-lg font-medium hover:text-pink-400" to="/shoes">
          <GiRunningShoe />
          <span className="ml-1">Shoes</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative flex items-center text-white text-lg font-medium hover:text-pink-400">
          <BsCart4 className="text-2xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      </nav>

      {/* Right Side */}
      <div className="hidden lg:flex items-center gap-6 ml-8">

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white text-lg font-medium hover:text-pink-400"
              >
                👤 My Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-white text-lg font-medium hover:text-pink-400"
              >
                Logout
              </button>
            </>
          ) : (


          <>
            <Link className="text-white text-lg font-medium hover:text-pink-400" to="/signup">Signup</Link>
            <Link className="text-white text-lg font-medium hover:text-pink-400" to="/login">Login</Link>
          </>
        )}

        {/* Greeting / Avatar */}
        {user ? (
          <div className="text-white flex items-center gap-2">
            <img
              src={user.profileImage || avatar}
              alt="User Avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
            <p>Hi {user.firstName}!</p>
          </div>
        ) : (
          <div className="text-white flex items-center gap-2">
            <img src={avatar} alt="Default Avatar" className="h-8 w-8 rounded-full" />
            <p>Guest</p>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} className="lg:hidden text-3xl text-white">
        <IoMdMenu />
      </button>

      {/* Mobile Navigation */}
      <div
        className={`fixed lg:hidden left-0 top-0 w-[250px] h-screen bg-gray-800 z-50 transition-all duration-300 ${
          open ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="text-white text-3xl">
            <IoMdClose />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-8 pt-4">
          {/* Men */}
          <div className="w-full px-4 mt-4">
            <Link className="text-white text-lg font-semibold flex items-center gap-2 mb-2" to="/" onClick={() => setOpen(false)}>
              <IoMan />
              <span>Men</span>
            </Link>
            <div className="pl-4">
              <MenDropdown />
            </div>
          </div>

          {/* Women */}
          <div className="w-full px-4 mt-4">
            <Link className="text-white text-lg font-semibold flex items-center gap-2 mb-2" to="/women" onClick={() => setOpen(false)}>
              <GrRestroomWomen />
              <span>Women</span>
            </Link>
            <div className="pl-4">
              <WomenDropdown />
            </div>
          </div>

          {/* Shoes */}
          <div className="w-full px-4 mt-4">
            <Link className="text-white text-2xl font-medium hover:text-pink-400" to="/shoes" onClick={() => setOpen(false)}>
            <GiRunningShoe />
            <span className="ml-4">Shoes</span>
          </Link>
          </div>

          {/* Cart */}
         <div className="w-full px-4 mt-4">
           <Link
            to="/cart"
            className="relative flex items-center text-white text-base sm:text-lg font-medium hover:text-pink-400"
            onClick={() => setOpen(false)}
          >
            <BsCart4 className="text-2xl sm:text-3xl ml-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
         </div>

          {/* Auth links for mobile */}
              {user ? (
                <>
                  {/* ✅ ADD THIS */}
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-white text-2xl font-medium hover:text-pink-400 mt-6"
                  >
                    👤 My Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-white text-2xl font-medium hover:text-pink-400 mt-2 mr-16"
                  >
                    Logout
                  </button>
                </>
              ) : (

            <>
              <Link className="text-white text-2xl font-medium hover:text-pink-400" to="/signup" onClick={() => setOpen(false)}>
                Signup
              </Link>
              <Link className="text-white text-2xl font-medium hover:text-pink-400" to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </>
          )}

          {/* Avatar */}
          {user ? (
            <div className="text-white flex items-center gap-2 mt-8 mr-11">
              <img
                src={user.profileImage || avatar}
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <p>Hi {user.firstName}!</p>
            </div>
          ) : (
            <div className="text-white flex items-center gap-2 mt-8">
              <img src={avatar} alt="Default Avatar" className="h-8 w-8 rounded-full" />
              <p>Guest</p>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
