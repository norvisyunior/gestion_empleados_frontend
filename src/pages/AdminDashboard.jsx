import React from "react";
import { useAuth } from "../context/authContext.jsx";
import AdminSidebar from "../components/Dashboard/AdminSidebar.jsx";
import Navbar from "../components/Dashboard/Navbar.jsx";
import AdminSummary from "../components/AdminSummary.jsx";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 h-screen bg-gray-300">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
