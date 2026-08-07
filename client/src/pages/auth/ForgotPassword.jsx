import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await forgotPassword({
        email: data.email,
        newPassword: data.newPassword,
      });

      toast.success(
        response.message ||
          "Password updated successfully."
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h2 className="mb-2 text-center text-3xl font-bold">
          Forgot Password
        </h2>

        <p className="mb-6 text-center text-gray-500">
          Reset your account password
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}

          <div>
            <label className="mb-1 block font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded-lg border p-3"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* New Password */}

          <div>
            <label className="mb-1 block font-medium">
              New Password
            </label>

            <input
              type="password"
              className="w-full rounded-lg border p-3"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message:
                    "Password must be at least 8 characters",
                },
              })}
            />

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-1 block font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              className="w-full rounded-lg border p-3"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              })}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Updating Password..."
              : "Update Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;