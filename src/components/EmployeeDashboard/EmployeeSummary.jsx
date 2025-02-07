import React from "react";
import { FaUsers } from "react-icons/fa";
import SummaryCard from "../Dashboard/SummaryCard";
import { useAuth } from "../../context/authContext";

const EmployeeSummary = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>

      <SummaryCard icon={<FaUsers />} text={user.name} color={"bg-teal-600"} />
    </div>
  );
};

export default EmployeeSummary;
