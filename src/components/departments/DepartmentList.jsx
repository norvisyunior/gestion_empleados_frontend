import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper"; // Asegúrate de importar DepartmentButtons
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filterdDepartments, setFilterdDepartments] = useState([]);

  const onDepartmentDelete = async (id) => {
    const updatedDepartments = departments.filter((dep) => dep._id !== id);
    setDepartments(updatedDepartments);
    setFilterdDepartments(updatedDepartments);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "https://gestion-empleados-backend.vercel.app/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const departmentsWithSno = response.data.departments.map((dep, index) => ({
          ...dep,
          sno: index + 1,
        }));
        setDepartments(departmentsWithSno);
        setFilterdDepartments(departmentsWithSno);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(searchValue)
    );
    setFilterdDepartments(records);
  };

  const columnsWithDelete = columns.map((col) => {
    if (col.name === "Action") {
      return {
        ...col,
        cell: (row) => (
          <DepartmentButtons
            _id={row._id}
            onDepartmentDelete={onDepartmentDelete}
          />
        ),
      };
    }
    return col;
  });

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center pb-6">
            <h3 className="text-3xl font-semibold">Manage Department</h3>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search by Dep Name"
              className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="text-white bg-teal-600 rounded px-4 py-1 hover:bg-teal-900"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columnsWithDelete} data={filterdDepartments} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
