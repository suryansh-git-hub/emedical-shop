import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Pill,
  CalendarDays,
  IndianRupee,
  Package,
  ImagePlus,
  FileText,
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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
            <Pill
              size={19}
              className="text-blue-600"
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Basic Information
            </h3>

            <p className="text-xs text-slate-500">
              Enter the basic details of the medicine.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Medicine Name */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
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
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm outline-none transition
                ${
                  errors.medicineName
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
            />

            {errors.medicineName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.medicineName.message}
              </p>
            )}
          </div>

          {/* Generic Name */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
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
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm outline-none transition
                ${
                  errors.genericName
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
            />

            {errors.genericName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.genericName.message}
              </p>
            )}
          </div>

          {/* Company */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Company
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Sun Pharma"
              {...register("company", {
                required: "Company is required",
              })}
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm outline-none transition
                ${
                  errors.company
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
            />

            {errors.company && (
              <p className="mt-1 text-xs text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Category */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Category
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              {...register("category", {
                required: "Category is required",
              })}
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm text-slate-700 outline-none transition
                ${
                  errors.category
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
            >
              <option value="" disabled>
                Select Category
              </option>

              <option value="Tablet">
                Tablet
              </option>

              <option value="Capsule">
                Capsule
              </option>

              <option value="Syrup">
                Syrup
              </option>

              <option value="Injection">
                Injection
              </option>

              <option value="Ointment">
                Ointment
              </option>

              <option value="Drops">
                Drops
              </option>

              <option value="Powder">
                Powder
              </option>
            </select>

            {errors.category && (
              <p className="mt-1 text-xs text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Batch Number */}

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
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
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm outline-none transition
                ${
                  errors.batchNumber
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
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

      <div className="border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
            <CalendarDays
              size={19}
              className="text-purple-600"
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Medicine Dates
            </h3>

            <p className="text-xs text-slate-500">
              Manufacturing and expiry information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Manufacturing Date */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Manufacturing Date
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="date"
              {...register("manufacturingDate", {
                required:
                  "Manufacturing date is required",
              })}
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm text-slate-700 outline-none transition
                ${
                  errors.manufacturingDate
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
            />

            {errors.manufacturingDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.manufacturingDate.message}
              </p>
            )}
          </div>

          {/* Expiry Date */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
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
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm text-slate-700 outline-none transition
                ${
                  errors.expiryDate
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
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

      <div className="border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
            <IndianRupee
              size={19}
              className="text-green-600"
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Pricing & Stock
            </h3>

            <p className="text-xs text-slate-500">
              Set prices, stock quantity and unit details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Purchase Price */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Purchase Price
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
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
                  w-full rounded-lg border bg-white py-2.5 pl-8 pr-3
                  text-sm outline-none transition
                  ${
                    errors.purchasePrice
                      ? "border-red-400 focus:ring-4 focus:ring-red-50"
                      : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  }
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
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Selling Price
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
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
                  w-full rounded-lg border bg-white py-2.5 pl-8 pr-3
                  text-sm outline-none transition
                  ${
                    errors.sellingPrice
                      ? "border-red-400 focus:ring-4 focus:ring-red-50"
                      : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  }
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
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Stock Quantity
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">
              <Package
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                min="0"
                placeholder="Enter quantity"
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
                  w-full rounded-lg border bg-white py-2.5 pl-9 pr-3
                  text-sm outline-none transition
                  ${
                    errors.stock
                      ? "border-red-400 focus:ring-4 focus:ring-red-50"
                      : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  }
                `}
              />
            </div>

            {errors.stock && (
              <p className="mt-1 text-xs text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Unit */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Unit
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              {...register("unit", {
                required: "Unit is required",
              })}
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm text-slate-700 outline-none transition
                ${
                  errors.unit
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
            >
              <option value="" disabled>
                Select Unit
              </option>

              <option value="Strip">
                Strip
              </option>

              <option value="Bottle">
                Bottle
              </option>

              <option value="Box">
                Box
              </option>

              <option value="Tube">
                Tube
              </option>

              <option value="Piece">
                Piece
              </option>

              <option value="Sachet">
                Sachet
              </option>
            </select>

            {errors.unit && (
              <p className="mt-1 text-xs text-red-500">
                {errors.unit.message}
              </p>
            )}
          </div>

          {/* GST */}

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              GST
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              {...register("gst", {
                required: "GST is required",
              })}
              className={`
                w-full rounded-lg border bg-white px-3 py-2.5
                text-sm text-slate-700 outline-none transition
                ${
                  errors.gst
                    ? "border-red-400 focus:ring-4 focus:ring-red-50"
                    : "border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                }
              `}
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

      <div className="border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
            <ImagePlus
              size={19}
              className="text-orange-600"
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Medicine Image
            </h3>

            <p className="text-xs text-slate-500">
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
          "
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <ImagePlus
              size={22}
              className="text-blue-600"
            />
          </div>

          <p className="text-sm font-semibold text-slate-700">
            Click to upload medicine image
          </p>

          <p className="mt-1 text-xs text-slate-400">
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
          Description
      ========================================== */}

      <div className="border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
            <FileText
              size={19}
              className="text-slate-600"
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Additional Information
            </h3>

            <p className="text-xs text-slate-500">
              Add an optional description for this medicine.
            </p>
          </div>
        </div>

        <textarea
          rows={4}
          placeholder="Enter medicine description..."
          {...register("description")}
          className="
            w-full
            resize-none
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            py-2.5
            text-sm
            text-slate-700
            placeholder:text-slate-400
            outline-none
            transition
            focus:border-blue-400
            focus:ring-4
            focus:ring-blue-50
          "
        />
      </div>

      {/* ==========================================
          Submit
      ========================================== */}

      <div className="flex justify-end border-t border-slate-100 pt-5">
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