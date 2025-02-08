import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import EmployeeButtons from "./EmployeeButtons";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("https://empleados-backend.vercel.app/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                src={`https://empleados-backend.vercel.app/${emp.userId.profileImage}`}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-5">
      <div className="text-center pb-6">
        <h3 className="text-3xl font-semibold">Manage Employees</h3>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="text-white bg-teal-600 rounded px-4 py-1 hover:bg-teal-900"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-5">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          paginationPerPage={6}
        />
      </div>
    </div>
  );
};

export default List;
