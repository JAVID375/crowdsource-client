import React from "react";
import { Navigate } from "react-router-dom";

// role: "citizen" or "official"
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // we will save role in login

  if (!token || userRole !== role) {
    return <Navigate to={`/${role}-login`} replace />;
  }

  return children;
};

export default PrivateRoute;
