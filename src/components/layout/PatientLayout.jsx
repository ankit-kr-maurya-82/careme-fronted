import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import PatientSidebar from "./PatientSidebar";

const PatientLayout = () => {
  const { user, loading } = useContext(UserContext);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "patient") {
    return <Navigate to="/login/patient" replace />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <PatientSidebar />
      <main
        style={{
         
          padding: "20px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
