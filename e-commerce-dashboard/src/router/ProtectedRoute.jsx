import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  console.log(token);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
