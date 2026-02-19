import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import PatientHeader from "./components/layout/PatientHeader";
import DoctorHeader from "./components/layout/DoctorHeader";
import Footer from "./components/layout/Footer";

import UserContext from "./context/UserContext";
const Layout = () => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  const isAuthPage = ["/login", "/register"].some((route) =>
    location.pathname.startsWith(route)
  );

  const isPatientDashboard = location.pathname.startsWith(
    "/patient/dashboard"
  );

  const isDoctorDashboard = location.pathname.startsWith(
    "/doctor/dashboard"
  );

  const hideHeader = isAuthPage;
  const hideFooter = isAuthPage || isPatientDashboard || isDoctorDashboard;

  return (
    <>
      {/* HEADER */}
      {!hideHeader && (
        <>
          {!user && <Header />}
          {user?.role === "patient" && <PatientHeader />}
          {user?.role === "doctor" && <DoctorHeader />}
        </>
      )}

      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      {!hideFooter && (
        <>
          {!user && <Footer />}
          {user?.role === "patient"}
          {user?.role === "doctor"}
        </>
      )}
    </>
  );
};


export default Layout;
