import { useContext } from "react";
import { Navigate } from "react-router-dom";
import EcomContext from "../context/EcomContext";
import { toast } from 'react-toastify';

function ProtectedRoute({ children }) {
  const { user } = useContext(EcomContext);

  // If no user is logged in → redirect to login page
  if (!user) {
      toast.error("You need to log in to access this page!");
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected component
  return children;
}

export default ProtectedRoute;


