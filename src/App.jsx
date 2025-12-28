import Header from "./component/Header"
import Footer from "./component/Footer"
import Men from "./component/Men"
import MenSecond from "./component/MenSecond"
import Cart from "./component/pages/Cart"
import { EcomProvider } from "./context/EcomContext"
import Checkout from "./component/pages/Checkout"
import MenDropdown from "./component/MenDropdown"
import Women from "./component/pages/Women"
import Shoes from "./component/pages/Shoes"
import SignUp from "./component/pages/SignUP"
import Login from "./component/pages/Login"
import LogOut from "./component/pages/LogOut"
import Detail from "./component/pages/Detail"
import WomenDropdown from "./component/pages/WomenDropdown"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import useLocalStorage from "./hooks/useLocalStorage"
import Thanks from "./component/pages/Thanks"
import DashboardPage from "./component/Dashboard/DashboardPage"
import Profile from "./component/pages/Profile"
import ProtectedRoute from "./component/ProtectedRoute"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from "./component/pages/OrderDetails"
import ScrollToTop from "./component/ScrollToTop"


function App() {
    const {getItem} = useLocalStorage("auth-token")
    const token = getItem()
    let authInitialState = {accessToken: token ?? null}

  return (
  <AuthProvider defaultState={authInitialState}>
    <EcomProvider>
      <Router>
    
    <Header />
      <Routes>
        <Route path="/" element={
          <>
          <Men />
          <MenSecond />
          
          <MenDropdown />
          <WomenDropdown />
          
          </>
        } />
         <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/men" element={<Men />} />
        <Route path="/menSecond" element={<MenSecond />} />
        <Route path="/women" element={<Women />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/detail/:category/:id" element={<Detail />} />
        <Route path="/checkout"element={<Checkout />} />
        <Route path="/thanks" element={<Thanks/>} />

        <Route path="/cart/" element={<ProtectedRoute>
          <Cart />
          </ProtectedRoute>} />
            <Route path="/orders/:id" element={<OrderDetails />} />

           <Route
         path="/profile"
         element={
        <Profile>
          <Profile />
      </Profile>
       }
      />
        <Route path="/checkout/" element={<Checkout />} />
        
      </Routes>
      <Footer />  
      <ScrollToTop />
    </Router>
    <ToastContainer position="top-center" autoClose={3000} />
  </EcomProvider>
  </AuthProvider>
  )
}

export default App
