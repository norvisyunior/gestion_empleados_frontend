import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "90px",
    center: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
    center: true,
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "120px",
    center: true,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "180px",
    center: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "180px",
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const fetchDepartments = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

export const getEmployees = async (departmentId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/employee/department/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
      onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}>
        Leave
      </button>
    </div>
  );
};
