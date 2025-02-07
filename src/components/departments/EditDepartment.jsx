import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          // Pequeño ajuste aquí
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        // Pequeño ajuste aquí
        alert(error.response.data.error);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="font-semibold text-2xl mb-6">Edit Department</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="dep_name"
                  className="text-sm font-medium text-gray-700"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  name="dep_name"
                  value={department.dep_name} // Añadir value para control de componentes
                  onChange={handleChange}
                  placeholder="Enter Dep Name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={department.description} // Añadir value para control de componentes
                  placeholder="Description"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
              >
                Edit Department
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
