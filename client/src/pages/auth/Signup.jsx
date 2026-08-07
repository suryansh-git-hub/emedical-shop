import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "pharmacist",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      const response = await registerUser(payload);

      toast.success(
        response.message || "Account created successfully."
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">

        <h2 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h2>

        <p className="mb-8 text-center text-gray-500">
          Register a new user
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Name */}

          <div>
            <label className="mb-1 block font-medium">
              Name
            </label>

            <input
              type="text"
              className="w-full rounded-lg border p-3"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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

          {/* Password */}

          <div>
            <label className="mb-1 block font-medium">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded-lg border p-3"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message:
                    "Password must be at least 8 characters",
                },
              })}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
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

          {/* Role */}

          <div>
            <label className="mb-1 block font-medium">
              Role
            </label>

            <select
              className="w-full rounded-lg border p-3"
              {...register("role")}
            >
              <option value="pharmacist">
                Pharmacist
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;