import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token"); // Remove JSON.parse()

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
