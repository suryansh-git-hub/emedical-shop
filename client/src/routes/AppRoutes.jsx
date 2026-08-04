import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Sales from "../pages/sales/Sales";
import Medicines from "../pages/medicines/Medicines";
import Suppliers from "../pages/suppliers/Suppliers";
import Customers from "../pages/customers/Customers";
import Purchases from "../pages/purchases/Purchases";
import Inventory from "../pages/Inventory/Inventory";
import Reports from "../pages/reports/Reports";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

import DashboardLayout from "../components/layouts/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            {/* Accessible to Admin & Pharmacist */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/inventory" element={<Inventory />} />

            {/* Admin Only Routes */}
            <Route
              element={
                <RoleProtectedRoute
                  allowedRoles={["admin"]}
                />
              }
            >
              <Route path="/medicines" element={<Medicines />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/reports" element={<Reports />} />
            </Route>

          </Route>
        </Route>

        {/* 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;