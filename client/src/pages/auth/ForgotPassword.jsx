import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Mail,
  Send,
  ArrowLeft,
} from "lucide-react";

import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await forgotPassword({
        email: data.email,
      });

      toast.success(
        response.message ||
          "Password reset link sent to your email."
      );

      setEmailSent(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send reset link."
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
            <Mail
              size={26}
              className="text-blue-600"
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Forgot Password?
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Enter your email and we'll send you a
            password reset link.
          </p>

        </div>

        {emailSent ? (

          /* ===============================
             EMAIL SENT
          =============================== */

          <div className="text-center">

            <div className="rounded-xl border border-green-200 bg-green-50 p-5">

              <Mail
                size={28}
                className="mx-auto text-green-600"
              />

              <h3 className="mt-3 font-semibold text-green-700">
                Check Your Email
              </h3>

              <p className="mt-2 text-sm text-green-600">
                We have sent a password reset link
                to your email address.
              </p>

            </div>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>

          </div>

        ) : (

          /* ===============================
             EMAIL FORM
          =============================== */

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  {...register("email", {
                    required:
                      "Email is required",
                  })}
                />

              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}

            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending Link...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Reset Link
                </>
              )}

            </button>

            <div className="text-center">

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>

            </div>

          </form>
        )}

      </div>

    </div>
  );
}

export default ForgotPassword;