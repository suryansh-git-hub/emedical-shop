import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Pill,
  CalendarDays,
  IndianRupee,
  Package,
  ImagePlus,

} from "lucide-react";

function MedicineForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  // ==========================================
  // Reset form when editing / adding
  // ==========================================

  useEffect(() => {
    if (defaultValues) {
      reset({
        medicineName:
          defaultValues.medicineName || "",

        genericName:
          defaultValues.genericName || "",

        company:
          defaultValues.company || "",

        category:
          defaultValues.category || "",

        batchNumber:
          defaultValues.batchNumber || "",

        manufacturingDate:
          defaultValues.manufacturingDate
            ?.split("T")[0] || "",

        expiryDate:
          defaultValues.expiryDate?.split("T")[0] ||
          "",

        purchasePrice:
          defaultValues.purchasePrice || "",

        sellingPrice:
          defaultValues.sellingPrice || "",

        stock:
          defaultValues.stock || "",

        unit:
          defaultValues.unit || "",

        gst:
          defaultValues.gst ?? "",

        description:
          defaultValues.description || "",

        medicineImage: null,
      });
    } else {
      reset({
        medicineName: "",
        genericName: "",
        company: "",
        category: "",
        batchNumber: "",
        manufacturingDate: "",
        expiryDate: "",
        purchasePrice: "",
        sellingPrice: "",
        stock: "",
        unit: "",
        gst: "",
        description: "",
        medicineImage: null,
      });
    }
  }, [defaultValues, reset]);

  // ==========================================
  // Submit
  // ==========================================

  const submitHandler = async (data) => {
    const success = await onSubmit(data);

    if (success && !defaultValues) {
      reset();
    }
  };

  const purchasePrice = watch("purchasePrice");

  // ==========================================
  // Common Input Classes
  // ==========================================

  const inputClass = (error) => `
    w-full
    rounded-lg
    border
    bg-white
    px-3
    py-2.5
    text-sm
    text-slate-800
    outline-none
    transition

    dark:bg-slate-800
    dark:text-slate-100

    ${
      error
        ? `
          border-red-400
          focus:ring-4
          focus:ring-red-50

          dark:border-red-500
          dark:focus:ring-red-950
        `
        : `
          border-slate-200
          focus:border-blue-400
          focus:ring-4
          focus:ring-blue-50

          dark:border-slate-700
          dark:focus:border-blue-500
          dark:focus:ring-blue-950
        `
    }
  `;

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6"
    >

      {/* ==========================================
          Basic Information
      ========================================== */}

      <div>

        <div className="mb-4 flex items-center gap-3">

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-blue-50

              dark:bg-blue-950/50
            "
          >
            <Pill
              size={19}
              className="
                text-blue-600
                dark:text-blue-400
              "
            />
          </div>

          <div>

            <h3
              className="
                font-semibold
                text-slate-900
                dark:text-slate-100
              "
            >
              Basic Information
            </h3>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Enter the basic details of the medicine.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Medicine Name */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Medicine Name
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Paracetamol"
              {...register("medicineName", {
                required:
                  "Medicine name is required",
              })}
              className={inputClass(
                errors.medicineName
              )}
            />

            {errors.medicineName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.medicineName.message}
              </p>
            )}

          </div>

          {/* Generic Name */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Generic Name
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Paracetamol"
              {...register("genericName", {
                required:
                  "Generic name is required",
              })}
              className={inputClass(
                errors.genericName
              )}
            />

            {errors.genericName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.genericName.message}
              </p>
            )}

          </div>

          {/* Company */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Company
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Sun Pharma"
              {...register("company", {
                required: "Company is required",
              })}
              className={inputClass(
                errors.company
              )}
            />

            {errors.company && (
              <p className="mt-1 text-xs text-red-500">
                {errors.company.message}
              </p>
            )}

          </div>

          {/* Category */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Category
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              {...register("category", {
                required: "Category is required",
              })}
              className={inputClass(
                errors.category
              )}
            >
              <option value="" disabled>
                Select Category
              </option>

              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
              <option value="Ointment">Ointment</option>
              <option value="Drops">Drops</option>
              <option value="Powder">Powder</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-xs text-red-500">
                {errors.category.message}
              </p>
            )}

          </div>

          {/* Batch Number */}

          <div className="md:col-span-2">

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Batch Number
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter batch number"
              {...register("batchNumber", {
                required:
                  "Batch Number is required",
              })}
              className={inputClass(
                errors.batchNumber
              )}
            />

            {errors.batchNumber && (
              <p className="mt-1 text-xs text-red-500">
                {errors.batchNumber.message}
              </p>
            )}

          </div>

        </div>
      </div>

      {/* ==========================================
          Dates
      ========================================== */}

      <div
        className="
          border-t
          border-slate-100
          pt-6

          dark:border-slate-800
        "
      >

        <div className="mb-4 flex items-center gap-3">

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-purple-50

              dark:bg-purple-950/50
            "
          >
            <CalendarDays
              size={19}
              className="
                text-purple-600
                dark:text-purple-400
              "
            />
          </div>

          <div>

            <h3
              className="
                font-semibold
                text-slate-900
                dark:text-slate-100
              "
            >
              Medicine Dates
            </h3>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Manufacturing and expiry information.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Manufacturing Date */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Manufacturing Date
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="date"
              {...register("manufacturingDate", {
                required:
                  "Manufacturing date is required",
              })}
              className={inputClass(
                errors.manufacturingDate
              )}
            />

            {errors.manufacturingDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.manufacturingDate.message}
              </p>
            )}

          </div>

          {/* Expiry Date */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Expiry Date
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="date"
              {...register("expiryDate", {
                required:
                  "Expiry date is required",

                validate: (value) =>
                  new Date(value) >
                    new Date(
                      watch(
                        "manufacturingDate"
                      )
                    ) ||
                  "Expiry date must be after manufacturing date",
              })}
              className={inputClass(
                errors.expiryDate
              )}
            />

            {errors.expiryDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.expiryDate.message}
              </p>
            )}

          </div>

        </div>
      </div>

      {/* ==========================================
          Pricing & Stock
      ========================================== */}

      <div
        className="
          border-t
          border-slate-100
          pt-6

          dark:border-slate-800
        "
      >

        <div className="mb-4 flex items-center gap-3">

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-green-50

              dark:bg-green-950/50
            "
          >
            <IndianRupee
              size={19}
              className="
                text-green-600
                dark:text-green-400
              "
            />
          </div>

          <div>

            <h3
              className="
                font-semibold
                text-slate-900
                dark:text-slate-100
              "
            >
              Pricing & Stock
            </h3>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Set prices, stock quantity and unit details.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Purchase Price */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Purchase Price
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">

              <span
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  text-slate-400
                  dark:text-slate-500
                "
              >
                ₹
              </span>

              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("purchasePrice", {
                  required:
                    "Purchase Price is required",
                  min: {
                    value: 0,
                    message:
                      "Purchase price cannot be negative",
                  },
                })}
                className={`
                  ${inputClass(
                    errors.purchasePrice
                  )}
                  pl-8
                `}
              />

            </div>

            {errors.purchasePrice && (
              <p className="mt-1 text-xs text-red-500">
                {errors.purchasePrice.message}
              </p>
            )}

          </div>

          {/* Selling Price */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Selling Price
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">

              <span
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  text-slate-400
                  dark:text-slate-500
                "
              >
                ₹
              </span>

              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("sellingPrice", {
                  required:
                    "Selling Price is required",
                  min: {
                    value: 0,
                    message:
                      "Selling price cannot be negative",
                  },
                  validate: (value) =>
                    Number(value) >=
                      Number(purchasePrice) ||
                    "Selling price should be greater than or equal to Purchase Price",
                })}
                className={`
                  ${inputClass(
                    errors.sellingPrice
                  )}
                  pl-8
                `}
              />

            </div>

            {errors.sellingPrice && (
              <p className="mt-1 text-xs text-red-500">
                {errors.sellingPrice.message}
              </p>
            )}

          </div>

          {/* Stock */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Stock Quantity
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">

              <Package
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  dark:text-slate-500
                "
              />

              <input
                type="number"
                min="0"
                placeholder="Enter quantity"
                readOnly={!!defaultValues}
                {...register("stock", {
                  required:
                    "Stock Quantity is required",
                  min: {
                    value: 0,
                    message:
                      "Stock cannot be negative",
                  },
                })}
                className={`
                  ${inputClass(errors.stock)}
                  pl-9
                  ${
                    defaultValues
                      ? "cursor-not-allowed opacity-60"
                      : ""
                  }
                `}
              />

            </div>

            {errors.stock && (
              <p className="mt-1 text-xs text-red-500">
                {errors.stock.message}
              </p>
            )}

            {defaultValues && (
              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Stock can only be changed from the
                Inventory page.
              </p>
            )}

          </div>

          {/* Unit */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Unit
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              {...register("unit", {
                required: "Unit is required",
              })}
              className={inputClass(errors.unit)}
            >
              <option value="" disabled>
                Select Unit
              </option>

              <option value="Strip">Strip</option>
              <option value="Bottle">Bottle</option>
              <option value="Box">Box</option>
              <option value="Tube">Tube</option>
              <option value="Piece">Piece</option>
              <option value="Sachet">Sachet</option>
            </select>

            {errors.unit && (
              <p className="mt-1 text-xs text-red-500">
                {errors.unit.message}
              </p>
            )}

          </div>

          {/* GST */}

          <div className="md:col-span-2">

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              GST
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              {...register("gst", {
                required: "GST is required",
              })}
              className={inputClass(errors.gst)}
            >
              <option value="" disabled>
                Select GST
              </option>

              <option value={0}>0%</option>
              <option value={5}>5%</option>
              <option value={12}>12%</option>
              <option value={18}>18%</option>
              <option value={28}>28%</option>
            </select>

            {errors.gst && (
              <p className="mt-1 text-xs text-red-500">
                {errors.gst.message}
              </p>
            )}

          </div>

        </div>
      </div>

      {/* ==========================================
          Medicine Image
      ========================================== */}

      <div
        className="
          border-t
          border-slate-100
          pt-6

          dark:border-slate-800
        "
      >

        <div className="mb-4 flex items-center gap-3">

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-orange-50

              dark:bg-orange-950/50
            "
          >
            <ImagePlus
              size={19}
              className="
                text-orange-600
                dark:text-orange-400
              "
            />
          </div>

          <div>

            <h3
              className="
                font-semibold
                text-slate-900
                dark:text-slate-100
              "
            >
              Medicine Image
            </h3>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Upload an image of the medicine.
            </p>

          </div>

        </div>

        <label
          className="
            flex
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-xl
            border-2
            border-dashed
            border-slate-200
            bg-slate-50
            px-6
            py-8
            text-center
            transition

            hover:border-blue-300
            hover:bg-blue-50/40

            dark:border-slate-700
            dark:bg-slate-800/50
            dark:hover:border-blue-500
            dark:hover:bg-blue-950/30
          "
        >

          <div
            className="
              mb-3
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-sm

              dark:bg-slate-700
            "
          >
            <ImagePlus
              size={22}
              className="
                text-blue-600
                dark:text-blue-400
              "
            />
          </div>

          <p
            className="
              text-sm
              font-semibold
              text-slate-700
              dark:text-slate-200
            "
          >
            Click to upload medicine image
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            PNG, JPG or JPEG
          </p>

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            {...register("medicineImage")}
            className="hidden"
          />

        </label>
      </div>

 

      {/* ==========================================
          Submit
      ========================================== */}

      <div
        className="
          flex
          justify-end
          border-t
          border-slate-100
          pt-5

          dark:border-slate-800
        "
      >

        <button
          type="submit"
          className="
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
          {defaultValues
            ? "Update Medicine"
            : "Add Medicine"}
        </button>

      </div>

    </form>
  );
}

export default MedicineForm;