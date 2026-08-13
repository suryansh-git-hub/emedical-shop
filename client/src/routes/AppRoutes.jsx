import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

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

        {/* ================================
            PUBLIC ROUTES
        ================================= */}

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Forgot Password */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Reset Password */}
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />


        {/* ================================
            PROTECTED ROUTES
        ================================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            {/* ============================
                Admin + Pharmacist
            ============================ */}

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* Customers */}
            <Route
              path="/customers"
              element={<Customers />}
            />

            {/* Inventory */}
            <Route
              path="/inventory"
              element={<Inventory />}
            />

            {/* Sales */}
            <Route
              path="/sales"
              element={<Sales />}
            />

            {/* Invoice */}
            <Route
              path="/sales/invoice/:id"
              element={<InvoicePage />}
            />

            {/* Medicines */}
            <Route
              path="/medicines"
              element={<Medicines />}
            />


            {/* ============================
                ADMIN ONLY
            ============================ */}

            <Route
              element={
                <RoleProtectedRoute
                  allowedRoles={["admin"]}
                />
              }
            >

              {/* Suppliers */}
              <Route
                path="/suppliers"
                element={<Suppliers />}
              />

              {/* Purchases */}
              <Route
                path="/purchases"
                element={<Purchases />}
              />

              {/* Reports */}
              <Route
                path="/reports"
                element={<Reports />}
              />

              {/* Users */}
              <Route
                path="/users"
                element={<Users />}
              />

            </Route>


            {/* ============================
                DASHBOARD 404
            ============================ */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Route>
        </Route>


        {/* ================================
            PUBLIC 404
        ================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;