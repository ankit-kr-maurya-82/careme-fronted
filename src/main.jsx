import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout.jsx";

// Public pages
import Home from "./pages/public/Home.jsx";
import About from "./pages/public/About.jsx";
import Contact from "./pages/public/Contact.jsx";
import Team from "./pages/public/Team.jsx";
import Github, { githubInfoLoader } from "./pages/public/Github.jsx";

// Auth pages
import Register from "./pages/auth/Register.jsx";
import DoctorRegister from "./pages/auth/DoctorRegister.jsx";
import PatientRegister from "./pages/auth/PatientRegister.jsx";
import DoctorLogin from "./pages/auth/DoctorLogin.jsx";
import PatientLogin from "./pages/auth/PatientLogin.jsx";

// Patient pages
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import PatientAppointments from "./pages/patient/PatientAppointments.jsx";
import PatientProfile from "./pages/patient/PatientProfile.jsx";
import AddProblem from "./pages/patient/AddProblem.jsx";
import Advice from "./pages/patient/Advice.jsx";
import Reminder from "./pages/patient/Reminder.jsx";
import PatientMedicines from "./pages/patient/PatientMedicines.jsx";
import MyProblems from "./pages/auth/MyProblems.jsx";
import DoctorList from "./pages/patient/DoctorList.jsx";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import AllProblems from "./pages/doctor/AllProblems.jsx";
import PatientList from "./pages/doctor/PatientList.jsx";
import DoctorAdvice from "./pages/doctor/DoctorAdvice.jsx";
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx";

// Layout & Context
import PatientLayout from "./components/layout/PatientLayout.jsx";
import UserProvider from "./context/UserContextProvider";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DoctorProfile from "./pages/doctor/DoctorProfile.jsx";
import Features from "./pages/public/Features.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public routes */}
      <Route index element={<Home />} />
      <Route path="team" element={<Team />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="feature" element={<Features />} />
      <Route path="register" element={<Register />} />
      <Route path="register/doctor" element={<DoctorRegister />} />
      <Route path="register/patient" element={<PatientRegister />} />
      <Route path="login/doctor" element={<DoctorLogin />} />
      <Route path="login/patient" element={<PatientLogin />} />
      <Route loader={githubInfoLoader} path="github" element={<Github />} />

      {/* Protected Patient Routes */}
      <Route element={<ProtectedRoute role="patient" />}>
        <Route path="patient" element={<PatientLayout />}>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="add-problem" element={<AddProblem />} />
          <Route path="my-problems" element={<MyProblems />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="advice" element={<Advice />} />
          <Route path="reminder" element={<Reminder />} />
          <Route path="medicines" element={<PatientMedicines />} />
          <Route path="doctors" element={<DoctorList />} />
        </Route>
      </Route>

      {/* Protected Doctor Routes */}
      <Route element={<ProtectedRoute role="doctor" />}>
        <Route path="doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="doctor/patients" element={<PatientList />} />
        <Route path="doctor/problems" element={<AllProblems />} />
        <Route path="doctor/appointments" element={<DoctorAppointments />} />
        <Route path="doctor/advice" element={<DoctorAdvice />} />
        <Route path="doctor/profile" element={<DoctorProfile />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
