import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Lock,
  Shield,
  Save,
} from "lucide-react";

function UserForm({
  onSubmit,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "pharmacist",
    },
  });

  // ==========================================
  // Populate Form
  // ==========================================

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
        email: defaultValues.email || "",
        password: "",
        role:
          defaultValues.role ||
          "pharmacist",
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

  // ==========================================
  // Submit
  // ==========================================

  const submitHandler = async (data) => {
    // Password is optional while editing
    if (
      defaultValues &&
      !data.password
    ) {
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

      {/* ==========================================
          NAME
      ========================================== */}

      <div>

        <label
          htmlFor="user-name"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
        >
          <User
            size={15}
            className="text-slate-400"
          />

          Full Name
        </label>

        <input
          id="user-name"
          type="text"
          placeholder="Enter full name"
          className={`
            h-12
            w-full
            rounded-xl
            border
            bg-slate-50
            px-4
            text-sm
            text-slate-700
            outline-none
            transition

            placeholder:text-slate-400

            hover:border-slate-300

            focus:bg-white
            focus:ring-4

            ${
              errors.name
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }
          `}
          {...register("name", {
            required:
              "Name is required",
          })}
        />

        {errors.name && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.name.message}
          </p>
        )}

      </div>

      {/* ==========================================
          EMAIL
      ========================================== */}

      <div>

        <label
          htmlFor="user-email"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
        >
          <Mail
            size={15}
            className="text-slate-400"
          />

          Email Address
        </label>

        <input
          id="user-email"
          type="email"
          placeholder="Enter email address"
          className={`
            h-12
            w-full
            rounded-xl
            border
            bg-slate-50
            px-4
            text-sm
            text-slate-700
            outline-none
            transition

            placeholder:text-slate-400

            hover:border-slate-300

            focus:bg-white
            focus:ring-4

            ${
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }
          `}
          {...register("email", {
            required:
              "Email is required",

            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message:
                "Please enter a valid email address",
            },
          })}
        />

        {errors.email && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.email.message}
          </p>
        )}

      </div>

      {/* ==========================================
          PASSWORD
      ========================================== */}

      {!defaultValues && (
        <div>

          <label
            htmlFor="user-password"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <Lock
              size={15}
              className="text-slate-400"
            />

            Password
          </label>

          <input
            id="user-password"
            type="password"
            placeholder="Enter password"
            className={`
              h-12
              w-full
              rounded-xl
              border
              bg-slate-50
              px-4
              text-sm
              text-slate-700
              outline-none
              transition

              placeholder:text-slate-400

              hover:border-slate-300

              focus:bg-white
              focus:ring-4

              ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }
            `}
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

          {!errors.password && (
            <p className="mt-1.5 text-xs text-slate-400">
              Password must contain at least 8 characters.
            </p>
          )}

          {errors.password && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.password.message}
            </p>
          )}

        </div>
      )}

      {/* ==========================================
          EDIT PASSWORD NOTE
      ========================================== */}

      {defaultValues && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">

          <div className="flex gap-3">

            <Lock
              size={17}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-sm font-semibold text-blue-800">
                Password
              </p>

              <p className="mt-0.5 text-xs text-blue-600">
                Leave the password empty if you don't want to change it.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          ROLE
      ========================================== */}

      <div>

        <label
          htmlFor="user-role"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
        >
          <Shield
            size={15}
            className="text-slate-400"
          />

          User Role
        </label>

        <select
          id="user-role"
          className="
            h-12
            w-full
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            text-sm
            font-medium
            capitalize
            text-slate-700
            outline-none
            transition

            hover:border-slate-300

            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-100
          "
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

      {/* ==========================================
          ACTION
      ========================================== */}

      <div className="border-t border-slate-200 pt-5">

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition

            hover:bg-blue-700
            hover:shadow-md

            focus:outline-none
            focus:ring-4
            focus:ring-blue-100

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          {isSubmitting ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/40
                  border-t-white
                "
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={17} />

              {defaultValues
                ? "Update User"
                : "Create User"}
            </>
          )}

        </button>

      </div>

    </form>
  );
}

export default UserForm;