import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Pill } from "lucide-react";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await loginUser(data);

      login(response.user, response.token);

      toast.success("Login Successful");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex min-h-screen items-center justify-center px-4 py-10">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

          {/* =========================
              Left Side
          ========================= */}

          <div className="hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div>

              {/* Logo */}

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">

                  <Pill
                    size={27}
                    strokeWidth={2}
                  />

                </div>

                <div>

                  <h1 className="text-xl font-bold">
                    eMedi Pharmacy
                  </h1>

                  <p className="text-sm text-blue-100">
                    Online Pharmacy
                  </p>

                </div>

              </div>

              {/* Main Text */}

              <div className="mt-24">

                <h2 className="text-4xl font-bold leading-tight">
                  Manage your pharmacy
                  <br />
                  with confidence.
                </h2>

                <p className="mt-5 max-w-md leading-7 text-blue-100">
                  Manage medicines, inventory, customers,
                  purchases and billing from one simple
                  platform.
                </p>

              </div>

            </div>

            {/* Bottom */}

            <div className="border-t border-white/20 pt-5">

              <p className="text-sm text-blue-100">
                Secure • Simple • Efficient
              </p>

            </div>

          </div>

          {/* =========================
              Login Section
          ========================= */}

          <div className="p-6 sm:p-10 lg:p-12">

            {/* Mobile Logo */}

            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">

                <Pill size={24} />

              </div>

              <div>

                <h1 className="font-bold text-gray-900">
                  Medical Shop
                </h1>

                <p className="text-xs text-gray-500">
                  Management System
                </p>

              </div>

            </div>

            {/* Heading */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Login to access your pharmacy dashboard.
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className={`w-full rounded-xl border bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />

                </div>

                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* Password */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`w-full rounded-xl border bg-gray-50 py-3 pl-10 pr-12 text-sm outline-none transition focus:bg-white focus:ring-2 ${
                      errors.password
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <div className="flex items-center gap-2">

                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                    Logging in...

                  </div>
                ) : (
                  "Login"
                )}

              </button>

            </form>

            {/* Divider */}

            <div className="my-7 flex items-center gap-3">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* Signup */}

            <div className="text-center text-sm text-gray-600">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Create an account
              </Link>

            </div>

            {/* Footer */}

            <p className="mt-8 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Pharmacy
              Management System
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;