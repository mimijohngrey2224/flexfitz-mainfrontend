import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import EcomContext from '../../context/EcomContext';

function LogOut() {
  const navigate = useNavigate();
   const [state, dispatch] = useContext(AuthContext);
  const { clearUser } = useContext(EcomContext);

  const handleRedirect = () => {
     // ✅ Clear auth and user data
    dispatch({ type: "setToken", payload: null });
    localStorage.removeItem("auth-token");
    localStorage.removeItem("token");
    clearUser(); // ← This should reset user data in EcomContext
    // Optionally clear user data here
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-3xl overflow-hidden">
        {/* Left - Sporty Image */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80)',
          }}
        ></div>

        {/* Right - Message */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">You've been logged out</h2>
          <p className="text-gray-600 mb-6">Thanks for being part of the movement. See you back soon!</p>

          <button
            onClick={handleRedirect}
            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
