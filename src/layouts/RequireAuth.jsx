// utils
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth({ children }) {
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;
