import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
    center: true,
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "120px",
    center: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "120px",
    center: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
    center: true,
  },
  {
    name: "BasicSalary",
    selector: (row) => row.basicSalary,
    width: "120px",
    center: true,
  },
  {
    name: "Alowances",
    selector: (row) => row.allowances,
    width: "120",
    center: true,
  },
  {
    name: "Deductions",
    selector: (row) => row.deductions,
    width: "120px",
    center: true,
  },
  {
    name: "Net Salary",
    selector: (row) => row.netSalary,
    width: "120px",
    center: true,
  },
  {
    name: "Pay Date",
    selector: (row) => row.payDate,
    width: "120px",
    center: true,
  },
];
