//old without image when resgistering
import { useState } from 'react';
import { useNavigate,} from 'react-router-dom';
import { useContext } from 'react';
import EcomContext from "../../context/EcomContext"
// import { Link } from 'react-router-dom';

function SignUp() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfrimPassword ] = useState("")
  const {ShowAndHide, registerUser} = useContext(EcomContext)
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 

  const redirect = useNavigate();

 const togglePasswordVisibility = () => setShowPassword(!showPassword);
const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const registerHandler = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://flexfitz-api.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      }),
    });

    const data = await res.json();

    if (typeof data === "string") {
      // Handle known error strings from backend
      if (data === "exist") {
        ShowAndHide("error", "User already exists");
      } else if (data === "invalid password") {
        ShowAndHide("error", "Password must contain at least 8 characters");
      } else if (data === "no match") {
        ShowAndHide("error", "Passwords do not match");
      } else {
        ShowAndHide("error", "An unknown error occurred");
      }
    } else if (data && data._id) {
      // Successful registration
      // ShowAndHide("success", "Registration successful!");
      // redirect("/login");

        // ✅ Successful registration
  ShowAndHide("success", "Registration successful!");

  // Generate image preview (for now) or use URL from backend
  const imagePreview = profileImageFile
    ? URL.createObjectURL(profileImageFile)
    : "/avatar.png"; // fallback if no image

  // Save user to context
  registerUser({
    name: `${firstName} ${lastName}`,
    profileImage: imagePreview,
    email,
    phone,
  });

  redirect("/login");

      } else if (data && data.message) {
    // Backend error (like from catch block)
    ShowAndHide("error", data.message);

    } else {
      ShowAndHide("error", "Unexpected response from server");
    }

  } catch (error) {
    console.error("Registration error:", error);
    ShowAndHide("error", "Something went wrong. Please try again.");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden">
        {/* Left Side - Image or Branding */}
        <div
          className="hidden md:flex md:w-1/2 h-[600px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/4662340/pexels-photo-4662340.jpeg?auto=compress&cs=tinysrgb&w=1000')",
          }}
        ></div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Account</h2>
          <p className="text-sm text-gray-600 mb-6">Join the team. Feel the energy.</p>
          
          <form className="space-y-4" onSubmit={registerHandler}>
            <div className="flex gap-4">
              <input type="text" placeholder="First Name" className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=> setFirstName(e.target.value)} />
              <input type="text" placeholder="Last Name" className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=> setLastName(e.target.value)}/>
            </div>

            <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=> setEmail(e.target.value)} />
            <input type="tel" placeholder="Phone" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={(e)=> setPhone(e.target.value)} />
            {/* <input type="file" className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500" /> */}

            <input
            type="file"
            accept="image/*"
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setProfileImageFile(e.target.files[0])}
            />
            <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setConfrimPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>


            <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300">
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account? <a href="/login" className="text-green-600 font-semibold">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;