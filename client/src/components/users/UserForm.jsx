import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UserForm({
  onSubmit,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "pharmacist",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        email: defaultValues.email,
        password: "",
        role: defaultValues.role,
      });
    } else {
      reset({
        name: "",
        email: "",
        password: "",
        role: "pharmacist",
      });
    }
  }, [defaultValues, reset]);

  const submitHandler = async (data) => {
    // Password is not required while editing
    if (defaultValues && !data.password) {
      delete data.password;
    }

    const success = await onSubmit(data);

    if (success) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-5"
    >
      {/* Name */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter full name"
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
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter email"
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

      {!defaultValues && (
        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
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
      )}

      {/* Role */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Role
        </label>

        <select
          className="w-full rounded-lg border p-3"
          {...register("role")}
        >
          <option value="admin">
            Admin
          </option>

          <option value="pharmacist">
            Pharmacist
          </option>
        </select>
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Saving..."
          : defaultValues
          ? "Update User"
          : "Create User"}
      </button>
    </form>
  );
}

export default UserForm;