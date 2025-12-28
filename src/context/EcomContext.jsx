
import { createContext, useState, useEffect} from "react";
import { toast } from 'react-toastify';
import { men } from "../data/EcomData";
import { menSecond } from "../data/EcomData";
import { WomenData } from "../data/EcomData";
import { shoes } from "../data/EcomData";

const EcomContext = createContext();

export const EcomProvider = ({ children }) => {
    const [menProduct, setMenProduct] = useState([]);
    const [menSlide, setMenSlide] = useState([]);
    const [womenSlide, setWomenSlide] = useState([]);
    const [shoesData, setShoesData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [showAndHide] = useState([]);
    const [user, setUser] = useState(null);
    const clearUser = () => setUser(null);

    



    const ShowAndHide = (type, message) => {
  alert(`${type.toUpperCase()}: ${message}`);
};

  // FIRST useEffect (leave product fetching here)
useEffect(() => {

  // Restore user
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  fetchProduct();
  fetchmenData();
  fetchmenSecondData();
  fetchwomenRaw();
  fetchshoesRaw();

  // ❌ REMOVE: fetchCart()
}, []);

const refreshCart = async () => {
  if (!user?.token) {
    setCartItems([]);
    return;
  }
  await fetchCart();
};


    const filteredMen = menProduct.filter((item) => item.men === true);
    const filteredMenSecond = menSlide.filter((item) => item.menSecond === true);
    const filteredWomen = womenSlide.filter((item) => item.WomenData === true);
    const filteredShoes = shoesData.filter((item) => item.shoes === true);

    const fetchProduct = async () => {
        const response = await fetch("http://localhost:3000/api/product")
        const data = await response.json();
        setMenProduct(data);
    }

    const fetchmenData = async()=>{
        const response = await fetch("http://localhost:3000/api/product/men")
        const data = await response.json();
        console.log("Fetched men data:", data);
        setMenProduct(data);
    };

    const fetchmenSecondData = async()=>{
        const response = await fetch("http://localhost:3000/api/product/menSecond")
        const data = await response.json();
        console.log("Fetched menSecond data:", data);
        setMenSlide(data);
    };

    const fetchwomenRaw = async()=>{
        const response = await fetch("http://localhost:3000/api/product/WomenData")
        const data = await response.json();
        console.log("Fetched WomenData data:", data);
        setWomenSlide(data);
    };

    const fetchshoesRaw = async()=>{
        const response = await fetch("http://localhost:3000/api/product/shoes")
        const data = await response.json();
        console.log("Fetched shoes data:", data);
        setShoesData(data);
    };    

//new 6 december
const fetchCart = async () => {
  try {
    const token = user?.token || localStorage.getItem("auth-token");

    const response = await fetch("http://localhost:3000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.products) {
      setCartItems(data.products);
    } else {
      setCartItems([]);
    }
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    setCartItems([]);
  }
};

const addToCart = async (product) => {
  try {
    const quantity = product.quantity || 1;
    const token = user?.token || localStorage.getItem("auth-token"); // ✅ define token
    console.log(JSON.parse(localStorage.getItem("user")));


    const response = await fetch("http://localhost:3000/api/cart/add", {
      method: "POST",
        credentials: "include",   // <-- THIS WAS MISSING!!!
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // ✅ attach token if exists
      },
      credentials: "include", // send cookies
      body: JSON.stringify({ productId: product._id, quantity }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Error from backend:", data.error);
      toast.error("Failed to add to cart");
      return;
    }

    if (data.products) {
      setCartItems(
        data.products.map((item) => ({
          cartItemId: item._id,
          ...item.product,
          quantity: item.quantity,
          amount: item.amount,
        }))
      );
    }

    toast.success("Item added to cart!");
  } catch (err) {
    console.error("Error adding to cart:", err);
    toast.error("Server error, please try again");
  }
};

//new to test with localhost 26 november
const updateQuantity = async (productId, newQuantity, size, color) => {
  try {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;

    const token = user?.token || localStorage.getItem("auth-token");

    const response = await fetch("http://localhost:3000/api/cart/update-quantity", {
      method: "POST",
        credentials: "include",   // <-- THIS WAS MISSING!!!
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: "include",
      body: JSON.stringify({ productId, quantity, size, color }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Update quantity error:", data.error);
      toast.error("Failed to update quantity");
      return;
    }

     if (data.products) {
  const formatted = data.products.map((item) => ({
    _id: item._id,
    product: {
      _id: item._id,
      name: item.name,
      img: item.img,
      price: item.price,
    },
    name: item.name,
    img: item.img,
    price: item.price,
    quantity: item.quantity,
    amount: item.amount,
    size: item.size,
    color: item.color
  }));
  
  setCartItems(formatted);
}


  } catch (error) {
    console.error("updateQuantity error:", error);
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/product/${id}`, {
      method: "DELETE",
        credentials: "include",   // <-- THIS WAS MISSING!!!
      headers: {
        "auth-token": localStorage.getItem("auth-token"), // your token
      },
    });

    const data = await res.json();
    if (res.ok) {
      // remove the deleted product from state
      setMenProduct((prev) => prev.filter((item) => item._id !== id));
      ShowAndHide("success", "Product deleted");
    } else {
      ShowAndHide("error", data.message || "Deletion failed");
    }
  } catch (err) {
    ShowAndHide("error", "Server error while deleting");
  }
};

const removeItem = async (productId, size, color) => {
  try {
    const res = await fetch("http://localhost:3000/api/cart/delete-item", {
      method: "POST",
      credentials: "include",   // <-- THIS WAS MISSING!!!
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
       },
      body: JSON.stringify({
        productId,
        size,
        color
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data.error || "Failed to remove item");
      return;
    }

    // Backend already returns the updated cart
    setCartItems(data.products);

    // ShowAndHide("Item removed");
    ShowAndHide(`Item removed: ${data.removedName || ""}`);
    
  } catch (error) {
    console.error("Remove item failed:", error);
  }

};


const registerUser = (userData) => {
  // userData = { name: 'Lade', profileImage: 'url or blob' }

  setUser(userData); // ✅ Save to context

  // Optional: save to localStorage for persistence
  localStorage.setItem("user", JSON.stringify(userData));

  toast.success("Registration successful!");
};


//new 6th december
const loginUser = (userData) => {
  // Save user in state
  setUser(userData);

  // Save to localStorage
  localStorage.setItem("user", JSON.stringify(userData));
  if (userData.token) {
    localStorage.setItem("auth-token", userData.token);
  }

  toast.success("Login successful!");
};

//new 6 december
const logoutUser = () => {
  setUser(null);

  localStorage.removeItem("user");
  localStorage.removeItem("auth-token");

  setCartItems([]);  // IMPORTANT: clear old user cart from UI

  toast.info("Logged out");
};

const totalAmount = (id) =>{
    return cartItems.reduce((total, item)=> total + item.amount, 0)
}

//15 december
const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("auth-token");

    const res = await fetch("http://localhost:3000/api/payment/initiate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = data.paymentLink;
    } else {
      console.error("Payment initiation failed", data);
    }
  } catch (error) {
    console.error(error);
  }
};

    return (
        <EcomContext.Provider
            value={{
                men: filteredMen,
                menSecond: filteredMenSecond,
                WomenData: filteredWomen,
                shoes: filteredShoes,
                addToCart,
                cartItems,
                updateQuantity,
                removeItem,
                totalAmount,
                ShowAndHide,
                deleteProduct,
                user, 
                setUser,
                registerUser,
                loginUser,
                logoutUser,
                clearUser,
                handleCheckout,
                refreshCart,
            }}
        >
            {children}
        </EcomContext.Provider>
    );
};

export default EcomContext;
