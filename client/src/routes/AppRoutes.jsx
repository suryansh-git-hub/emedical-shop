import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
// import NotFound from "../pages/NotFound";
import Sales from "../pages/sales/Sales";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Medicines from "../pages/medicines/Medicines";
import Suppliers from "../pages/suppliers/Suppliers";
import Customers from "../pages/customers/Customers";
import Purchases from "../pages/purchases/Purchases";
import Reports from "../pages/reports/Reports";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/medicines" element={<Medicines />} />
             <Route path="/suppliers" element={<Suppliers />} />
             <Route path = "/customers" element = {<Customers />} />
              <Route path = "/purchases" element = {<Purchases />} />
              <Route path = "/sales" element = {<Sales />} />
              <Route path = "/reports" element = {<Reports />} />
          </Route>
        </Route>

        {/* 404
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;