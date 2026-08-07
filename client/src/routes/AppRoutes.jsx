import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import Sales from "../pages/sales/Sales";
import InvoicePage from "../pages/sales/InvoicePage";

import Medicines from "../pages/medicines/Medicines";
import Suppliers from "../pages/suppliers/Suppliers";
import Customers from "../pages/customers/Customers";
import Purchases from "../pages/purchases/Purchases";
import Inventory from "../pages/inventory/Inventory";
import Reports from "../pages/reports/Reports";
import Users from "../pages/users/Users";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Public Routes ================= */}

        <Route path="/" element={<Login />} />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ================= Protected Routes ================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            {/* Admin + Pharmacist */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/customers"
              element={<Customers />}
            />

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            <Route
              path="/sales"
              element={<Sales />}
            />

            {/* Invoice Page */}

            <Route
              path="/sales/invoice/:id"
              element={<InvoicePage />}
            />

            <Route
              path="/medicines"
              element={<Medicines />}
            />

            {/* ================= Admin Only ================= */}

            <Route
              element={
                <RoleProtectedRoute
                  allowedRoles={["admin"]}
                />
              }
            >
              <Route
                path="/suppliers"
                element={<Suppliers />}
              />

              <Route
                path="/purchases"
                element={<Purchases />}
              />

              <Route
                path="/reports"
                element={<Reports />}
              />

              <Route
                path="/users"
                element={<Users />}
              />
            </Route>

            {/* Dashboard 404 */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Route>
        </Route>

        {/* Public 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;