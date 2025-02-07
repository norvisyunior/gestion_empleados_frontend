import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://gestion-empleados-backend.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Detalles del Empleado
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={`http://localhost:3000/${employee.userId.profileImage}`}
            alt="profile"
            className="border w-72 h-72 rounded-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Nombre:</span>{" "}
            {employee.userId.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span>{" "}
            {employee.userId.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Departamento:</span>{" "}
            {employee.department.dep_name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Fecha de Nacimiento:</span>{" "}
            {new Date(employee.dob).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Género:</span> {employee.gender}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Estado Civil:</span>{" "}
            {employee.maritalStatus}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Designación:</span>{" "}
            {employee.designation}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Salario:</span> {employee.salary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
