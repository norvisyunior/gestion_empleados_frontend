import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SalaryView = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.error("Error fetching salaries:", error);
      if (error.response && !error.response.data.success) {
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [id]);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      new Date(salary.payDate).toLocaleDateString().includes(q)
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <div className="p-6">
      <div className="text-center pb-6">
        <h3 className="text-3xl font-semibold text-gray-800">Salary History</h3>
      </div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="By Date(DD/MM/YYYY)"
          className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
          onChange={filterSalaries}
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
                Basic Salary
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Allowances
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Net Salary
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Pay Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSalaries.map((salary) => (
              <tr key={salary._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{sno++}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.employeeId.employeeId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.basicSalary}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.allowances}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.deductions}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salary.netSalary}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(salary.payDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredSalaries.length === 0 && (
        <div className="text-center text-gray-800 mt-6">
          <p className="text-lg font-bold">No Records</p>
        </div>
      )}
    </div>
  );
};

export default SalaryView;
