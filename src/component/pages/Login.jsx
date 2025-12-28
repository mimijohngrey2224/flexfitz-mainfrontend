import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import EcomContext from "../../context/EcomContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";



function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [state, dispatch] = useContext(AuthContext)
  const {ShowAndHide} = useContext(EcomContext)
  console.log("ShowAndHide is:", ShowAndHide);

  const {setItem} = useLocalStorage("auth-token")

  const context = useContext(EcomContext);
console.log("EcomContext value:", context);

  const redirect = useNavigate();

  // redirect("/dashboard");




  //new 20 november

  const { loginUser } = useContext(EcomContext);

const loginHandler = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log("Login response:", data);

    if (!data.success) {
      ShowAndHide("error", "Invalid Email/Password");
      return;
    }

    // 🚀 USE THE EcomContext loginUser FUNCTION
    loginUser({
      ...data.user,
      token: data.token
    });

    redirect("/dashboard");
    ShowAndHide("success", "Login successful!");
  } catch (err) {
    console.error(err);
    ShowAndHide("error", "Server error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden">
        {/* Left Side - Image or Branding */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80)',
          }}
        ></div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-6">Login to your account to continue</p>

          <form className="space-y-4" onSubmit={loginHandler}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=> setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=> setPassword(e.target.value)}
            />

            <div className="flex justify-between text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-green-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{' '}
            <a href="/signup" className="text-green-600 font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
