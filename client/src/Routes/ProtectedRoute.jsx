import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authentication } from "../context/Provider";

function ProtectedRoute() {
  const access = useContext(authentication);
  return access.auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
