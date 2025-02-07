import React from "react";
import SideBar from "../components/EmployeeDashboard/SideBar.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar.jsx";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 ml-64 h-screen bg-gray-300">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
