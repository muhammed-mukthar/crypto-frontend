/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Navbar from "../components/Navbar";
import Home from "../screens/Home";
import Login from "../screens/Login";
import ProfileDetails from "../screens/ProfileDetails";
import Register from "../screens/Register";
import AllPosts from "../screens/AllPosts";
import AdminRoutes from "./AdminRoutes";
import About from "../screens/About";

const InsideRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="mt-10">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<InsideRoutes />} />

      {/* <Route path="/send-email" element={<SendEmail />} /> */}
      {/* <Route path="/dashboard/*" element={<DashBoardRoutes />} /> */}
    </Routes>
  );
};

export default MyRoutes;
