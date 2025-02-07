import React, { useEffect, useState } from "react";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const LeaveList = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFileredLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setFileredLeaves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleFilter = (e) => {
    const records = leaves.filter((leave) =>
      leave.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFileredLeaves(records);
  };

  const handleButton = (status) => {
    const records = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFileredLeaves(records);
  };

  return (
    <>
      {leaves ? (
        <div className="p-5">
          <div className="text-center pb-6">
            <h3 className="text-3xl font-semibold">Manage Leaves</h3>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search by Emp ID"
              className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={handleFilter}
            />
            <div className="flex items-center justify-between gap-4">
              <button onClick={() => handleButton("")} className="text-white bg-teal-600 rounded px-4 py-1 hover:bg-teal-900">
                All
              </button>
              <button onClick={() => handleButton("Pending")} className="text-white bg-teal-600 rounded px-4 py-1 hover:bg-teal-900">
                Pending
              </button>
              <button onClick={() => handleButton("Approved")} className="text-white bg-teal-600 rounded px-4 py-1 hover:bg-teal-900">
                Approved
              </button>
              <button onClick={() => handleButton("Rejected")} className="text-white bg-teal-600 rounded px-4 py-1 hover:bg-teal-900">
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-3">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              paginationPerPage={6}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default LeaveList;
