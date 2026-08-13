import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

import { resetPassword } from "../../services/authService";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await resetPassword(
        token,
        {
          password: data.password,
        }
      );

      toast.success(
        response.message ||
          "Password reset successfully."
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Reset link is invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

        {/* Header */}

        <div className="mb-7 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Lock
              size={26}
              className="text-blue-600"
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Set New Password
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Create a new password for your account.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              New Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                className={`w-full rounded-xl border py-3 pl-10 pr-11 text-sm outline-none transition focus:ring-2 ${
                  errors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
                {...register("password", {
                  required:
                    "Password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                className={`w-full rounded-xl border py-3 pl-10 pr-11 text-sm outline-none transition focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
                {...register(
                  "confirmPassword",
                  {
                    required:
                      "Confirm your password",
                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  }
                )}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Updating Password..."
              : "Set New Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;