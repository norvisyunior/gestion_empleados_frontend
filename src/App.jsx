import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import SalaryAdd from "./components/salary/SalaryAdd";
import SalaryView from "./components/salary/SalaryView";
import EmployeeSummary from "./components/EmployeeDashboard/EmployeeSummary";
import EmployeeView from "./components/EmployeeDashboard/EmployeeView";
import EmployeeLeaves from "./components/leaves/EmployeeLeaves";
import AddLeave from "./components/leaves/AddLeave";
import Setting from "./components/EmployeeDashboard/Setting";
import LeaveList from "./components/leaves/LeaveList";
import TotalSalary from "./components/salary/TotalSalary";
import LeaveDetail from "./components/leaves/LeaveDetail";
import LeaveView from "./components/leaves/LeaveView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]} />
              <AdminDashboard />
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>

          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>

          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route
            path="/admin-dashboard/employees/:id"
            element={<View />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/edit/:id"
            element={<Edit />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/salary/:id"
            element={<SalaryView />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/leaves/:id"
            element={<LeaveView />}
          ></Route>

          <Route path="/admin-dashboard/salary" element={<SalaryAdd />}></Route>
          <Route path="/admin-dashboard/totalSalary" element={<TotalSalary />}></Route>
          <Route path="/admin-dashboard/leaves" element={<LeaveList />}></Route>
          <Route path="/admin-dashboard/leaves/details/:id" element={<LeaveDetail />}></Route>
        </Route>

        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={[ "employee"]} />
              <EmployeeDashboard />
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummary />}></Route>

          <Route
            path="/employee-dashboard/profile/:id"
            element={<EmployeeView />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves"
            element={<EmployeeLeaves />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves/add-leave"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/salary/:id"
            element={<SalaryView />}
          ></Route>
          <Route
            path="/employee-dashboard/setting"
            element={<Setting />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
