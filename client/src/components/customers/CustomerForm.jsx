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

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Customer Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Customer Name
          </label>

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter Customer Name"
            required
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Contact Number */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Contact Number
          </label>

          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter Contact Number"
            required
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

      </div>

      {/* Address */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Address
        </label>

        <textarea
          rows={4}
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter Customer Address"
          required
          className="w-full resize-none rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          <Save size={18} />

          {isEditing ? "Update Customer" : "Add Customer"}
        </button>

      </div>

    </form>
  );
};

export default CustomerForm;