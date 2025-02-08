import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

const LeaveView = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/leave/empLeave/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setLeaves(response.data.leave);
        setFilteredLeaves(response.data.leave);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response && !error.response.data.success) {
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id]);

  useEffect(() => {
    setFilteredLeaves(
      leaves.filter((leave) =>
        leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, leaves]);

  return (
    <div className="p-6">
      <div className="text-center pb-6">
        <h3 className="text-3xl font-semibold text-gray-800">Leave History</h3>
      </div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="By leaveType"
          className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                SNO
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Emp ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                From
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave.employeeId.employeeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {leave.leaveType}
                </td>
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
      {filteredLeaves.length === 0 && (
        <div className="text-center text-gray-800 mt-6">
          <p className="text-lg font-bold">No Records</p>
        </div>
      )}
    </div>
  );
};

export default LeaveView;
