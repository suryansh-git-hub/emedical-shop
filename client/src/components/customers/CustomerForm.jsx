import { Save } from "lucide-react";

const CustomerForm = ({
  formData,
  setFormData,
  onSubmit,
  isEditing,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputClass = `
    w-full
    rounded-xl
    border
    border-slate-200
    bg-slate-50
    px-4
    py-3
    text-sm
    text-slate-700
    outline-none
    transition
    placeholder:text-slate-400
    focus:border-blue-500
    focus:bg-white
    focus:ring-4
    focus:ring-blue-100

    dark:border-slate-700
    dark:bg-slate-800
    dark:text-slate-200
    dark:placeholder:text-slate-500
    dark:focus:border-blue-500
    dark:focus:bg-slate-800
    dark:focus:ring-blue-950/50
  `;

  const labelClass = `
    mb-2
    block
    text-sm
    font-medium
    text-slate-700

    dark:text-slate-300
  `;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >

      {/* Customer Information */}

      <div>

        <div className="mb-4">

          <h3
            className="
              text-sm
              font-semibold
              text-slate-800

              dark:text-slate-100
            "
          >
            Customer Information
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Enter the customer's basic contact details.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Customer Name */}

          <div>

            <label
              htmlFor="customerName"
              className={labelClass}
            >
              Customer Name
            </label>

            <input
              id="customerName"
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter customer name"
              required
              className={inputClass}
            />

          </div>

          {/* Contact */}

          <div>

            <label
              htmlFor="contactNumber"
              className={labelClass}
            >
              Contact Number
            </label>

            <input
              id="contactNumber"
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
              className={inputClass}
            />

          </div>

          {/* Email */}

          <div className="md:col-span-2">

            <label
              htmlFor="email"
              className={labelClass}
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className={inputClass}
            />

          </div>

        </div>

      </div>

      {/* Address */}

      <div>

        <label
          htmlFor="address"
          className={labelClass}
        >
          Address
        </label>

        <textarea
          id="address"
          rows={4}
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter customer address"
          required
          className={`
            ${inputClass}
            resize-none
          `}
        />

      </div>

      {/* Submit */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-slate-100
          pt-5
          sm:flex-row
          sm:justify-end

          dark:border-slate-800
        "
      >

        <button
          type="submit"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-6
            py-3
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
          "
        >
          <Save size={17} />

          {isEditing
            ? "Update Customer"
            : "Add Customer"}
        </button>

      </div>

    </form>
  );
};

export default CustomerForm;