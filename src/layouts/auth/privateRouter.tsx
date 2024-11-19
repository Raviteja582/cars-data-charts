import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = sessionStorage.getItem("isAuthenticated");
  return auth === "true" ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoutes;
