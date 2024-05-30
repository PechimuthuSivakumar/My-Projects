import React from "react";
import { Navigate } from "react-router-dom";

export const AuthRouter = ({ children }) => {
  const isAdmin = localStorage.getItem("api_var_login") === "true";
  const adminToken = localStorage.getItem("api_var_token");

  if (isAdmin && adminToken !== "") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const Redirect = ({ children }) => {
  const isAdmin = localStorage.getItem("api_var_login") === "true";
  const adminToken = localStorage.getItem("api_var_token");

  if (!isAdmin || adminToken === "") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
