import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `https://empleados-backend.vercel.app/api/leave/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching leave:", error);
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://empleados-backend.vercel.app/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  if (!leave) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Detalles del Permiso
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`}
            alt="profile"
            className="border w-72 h-72 rounded-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Nombre:</span>{" "}
            {leave.employeeId.userId.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Empleado ID:</span>{" "}
            {leave.employeeId.employeeId}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Tipo de permiso:</span>{" "}
            {leave.leaveType}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Motivo:</span> {leave.reason}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Departamento:</span>{" "}
            {leave.employeeId.department.dep_name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Desde:</span>{" "}
            {new Date(leave.startDate).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Hasta:</span>{" "}
            {new Date(leave.endDate).toLocaleDateString()}
          </p>
          <p className="text-lg flex space-x-2">
            <span className="font-semibold">
              {leave.status === "Pending" ? "Acción" : "Estado"}:
            </span>{" "}
            {leave.status === "Pending" ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => changeStatus(leave._id, "Approved")}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded md-2"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => changeStatus(leave._id, "Rejected")}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Rechazar
                </button>
              </div>
            ) : (
              <p
                className={`text-xl font-bold flex space-x-1 text-center items-center ${
                  leave.status === "Approved"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {leave.status === "Approved" ? (
                  <FaCheck className="mr-1" />
                ) : (
                  <FaTimes className="mr-1" />
                )}
                {leave.status}
              </p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetail;
