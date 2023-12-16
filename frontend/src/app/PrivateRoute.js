import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const userRole = localStorage.getItem("role");

  if (allowedRoles.includes(userRole)) {
    return <Route {...rest} element={<Component />} />;
  } else {
    return <Navigate to="/restricted-access" />;
  }
};

export default PrivateRoute;
