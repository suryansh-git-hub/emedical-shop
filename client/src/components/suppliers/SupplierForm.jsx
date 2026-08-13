import {
  Save,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";

const SupplierForm = ({
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
    pl-11
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
    font-semibold
    text-slate-700

    dark:text-slate-300
  `;

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      {/* ==========================================
          FORM INTRO
      ========================================== */}

      <div
        className="
          rounded-2xl
          bg-blue-50
          p-4

          dark:bg-blue-950/40
        "
      >
        <div className="flex items-start gap-3">

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              text-white
            "
          >
            <Building2 size={19} />
          </div>

          <div>

            <h3
              className="
                font-semibold
                text-slate-800

                dark:text-slate-100
              "
            >
              {isEditing
                ? "Update Supplier Details"
                : "Add New Supplier"}
            </h3>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-500

                dark:text-slate-400
              "
            >
              Enter the supplier's contact and business
              information below.
            </p>

          </div>

        </div>
      </div>

      {/* ==========================================
          BASIC INFORMATION
      ========================================== */}

      <div>

        <h3
          className="
            mb-4
            text-sm
            font-bold
            uppercase
            tracking-wide
            text-slate-500

            dark:text-slate-400
          "
        >
          Supplier Information
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Supplier Name */}

          <div>

            <label
              htmlFor="supplierName"
              className={labelClass}
            >
              Supplier Name
            </label>

            <div className="relative">

              <Building2
                size={17}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                id="supplierName"
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                placeholder="Enter supplier name"
                required
                className={inputClass}
              />

            </div>

          </div>

          {/* Contact Number */}

          <div>

            <label
              htmlFor="contactNumber"
              className={labelClass}
            >
              Contact Number
            </label>

            <div className="relative">

              <Phone
                size={17}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

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

          </div>

          {/* Email */}

          <div>

            <label
              htmlFor="email"
              className={labelClass}
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={17}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

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

          {/* GST Number */}

          <div>

            <label
              htmlFor="gstNumber"
              className={labelClass}
            >
              GST Number
            </label>

            <div className="relative">

              <FileText
                size={17}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                id="gstNumber"
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                placeholder="Enter GST number"
                required
                className={inputClass}
              />

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          ADDRESS
      ========================================== */}

      <div>

        <label
          htmlFor="address"
          className={labelClass}
        >
          Business Address
        </label>

        <div className="relative">

          <MapPin
            size={17}
            className="
              absolute
              left-4
              top-4
              text-slate-400
            "
          />

          <textarea
            id="address"
            rows={4}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter complete supplier address"
            required
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
              pl-11
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
            "
          />

        </div>

      </div>

      {/* ==========================================
          ACTIONS
      ========================================== */}

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

        {/* Cancel */}

        <button
          type="button"
          onClick={() => {
            // Modal close is handled by parent.
          }}
          className="
            hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:bg-slate-50
            sm:block

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-300
            dark:hover:bg-slate-700
          "
        >
          Cancel
        </button>

        {/* Submit */}

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

            dark:bg-blue-500
            dark:hover:bg-blue-600
            dark:focus:ring-blue-950
          "
        >
          <Save size={17} />

          {isEditing
            ? "Update Supplier"
            : "Add Supplier"}
        </button>

      </div>

    </form>
  );
};

export default SupplierForm;