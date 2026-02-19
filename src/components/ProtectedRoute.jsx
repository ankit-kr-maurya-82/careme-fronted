import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext"; // ✅ correct

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useContext(UserContext); // ✅ destructure from actual context

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" replace />; // not logged in

  if (role && user.role !== role) return <Navigate to="/" replace />; // role mismatch

  return <Outlet />;
};

export default ProtectedRoute;
