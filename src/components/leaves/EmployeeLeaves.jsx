import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const EmployeeLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `https://gestion-empleados-backend.vercel.app/api/leave/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchLeaves();
    }
  }, [user]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredLeaves(leaves);
    } else {
      const filtered = leaves.filter((leave) =>
        leave.leaveType.toLowerCase().includes(query)
      );
      setFilteredLeaves(filtered);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center pb-6">
        <h3 className="text-3xl font-semibold text-gray-800">Manage Leaves</h3>
      </div>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Leave Type"
          value={searchQuery}
          onChange={handleSearch}
          className="rounded px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <Link
          to="/employee-dashboard/leaves/add-leave"
          className="text-white bg-teal-600 rounded px-4 py-2 hover:bg-teal-700"
        >
          Add New Leave
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                SNO
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Start at
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeaves.map((leave) => (
              <tr key={leave._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{sno++}</td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.leaveType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{leave.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`flex items-center ${
                      leave.status === "Approved"
                        ? "text-green-700"
                        : leave.status === "Rejected"
                        ? "text-red-700"
                        : "text-gray-700"
                    }`}
                  >
                    {leave.status === "Approved" ? (
                      <FaCheck className="mr-2" />
                    ) : leave.status === "Rejected" ? (
                      <FaTimes className="mr-2" />
                    ) : null}
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeLeaves;
