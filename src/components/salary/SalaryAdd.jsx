import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

const SalaryAdd = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [salary, setSalary] = useState({
    employeeId: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartmentChange = async (e) => {
    const departmentId = e.target.value;
    const emps = await getEmployees(departmentId);
    setEmployees(emps);
    setSalary((prevData) => ({ ...prevData, department: departmentId }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://empleados-backend.vercel.app/api/salary/add", salary, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        alert("Salary added successfully");
        navigate("/admin-dashboard/employees");
      } else {
        alert("Error adding salary");
      }
    } catch (error) {
      console.error("Error adding salary:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={salary.department || ""}
              onChange={handleDepartmentChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee
            </label>
            <select
              name="employeeId"
              value={salary.employeeId || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.userId.name}
                </option>
              ))}
            </select>
          </div>
          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              value={salary.basicSalary}
              onChange={handleChange}
              placeholder="Enter Basic Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Allowances */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Allowances
            </label>
            <input
              type="number"
              name="allowances"
              value={salary.allowances}
              onChange={handleChange}
              placeholder="Enter Allowances"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          {/* Deductions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deductions
            </label>
            <input
              type="number"
              name="deductions"
              value={salary.deductions}
              onChange={handleChange}
              placeholder="Enter Deductions"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          {/* Pay Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pay Date
            </label>
            <input
              type="date"
              name="payDate"
              value={salary.payDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default SalaryAdd;
