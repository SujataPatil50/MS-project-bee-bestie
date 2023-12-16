import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import checkAuth from "./app/auth";
import SocketIOProvider from "./context/SocketProvider";
import { useUser } from "./store/store";
// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
  const [user] = useUser();

  useEffect(() => {
    checkAuth();
  }, [user]);

  return (
    <>
      <SocketIOProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/app/*" element={<Layout />} />

            <Route
              path="*"
              element={
                <Navigate to={user ? "/app/home" : "/login"} replace />
              }
            />
          </Routes>
        </Router>
      </SocketIOProvider>
    </>
  );
}
export default App;
