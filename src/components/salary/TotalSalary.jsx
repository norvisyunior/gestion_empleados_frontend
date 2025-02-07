import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/SalaryHelper";

const TotalSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState([]);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get("https://gestion-empleados-backend.vercel.app/api/salary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.salaries.map((salary) => ({
          _id: salary._id,
          sno: sno++,
          employeeId: salary.employeeId.employeeId,
          name: salary.employeeId.userId.name,
          department: salary.employeeId.department.dep_name,
          basicSalary: salary.basicSalary,
          allowances: salary.allowances,
          deductions: salary.deductions,
          netSalary: salary.netSalary,
          payDate: new Date(salary.payDate).toLocaleDateString(),
        }));
        setSalaries(data);
        setFilteredSalaries(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const handleFilter = (e) => {
    const records = salaries.filter((salary) =>
      salary.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSalaries(records);
  };

  return (
    <>
      {salaries ? (
        <div className="p-5">
          <div className="text-center pb-6">
            <h3 className="text-3xl font-semibold">Total Salary $</h3>
          </div>
          <div className="flex items-center justify-end">
            <input
              type="text"
              placeholder="Search by Emp Name"
              className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={handleFilter}
            />
          </div>

          <div className="mt-3">
            <DataTable
              columns={columns}
              data={filteredSalaries}
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

export default TotalSalary;
