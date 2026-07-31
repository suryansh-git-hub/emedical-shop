import { useForm } from "react-hook-form";
import { useEffect } from "react";

function MedicineForm({ onSubmit,defaultValues, }) {
const {
  register,
  handleSubmit,
  reset,watch,
  formState: { errors },
} = useForm({defaultValues});

useEffect(() => {
  if (defaultValues) {
    reset({
      medicineName:
        defaultValues.medicineName || "",

      genericName:
        defaultValues.genericName || "",

      company: defaultValues.company || "",

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

      stock: defaultValues.stock || "",

      unit: defaultValues.unit || "",

      gst: defaultValues.gst || "",

      description:
        defaultValues.description || "",
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

const submitHandler = async (data) => {
  const success = await onSubmit(data);

  if (success && !defaultValues) {
    reset();
  }
};

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-1 gap-5 md:grid-cols-2"
    >
     <div>
  <label className="mb-1 block font-medium">
    Medicine Name
  </label>

  <input
    type="text"
    {...register("medicineName", {
      required: "Medicine name is required",
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.medicineName && (
    <p className="mt-1 text-sm text-red-500">
      {errors.medicineName.message}
    </p>
  )}
</div>

<div>
  <label className="mb-1 block font-medium">
    Generic Name
  </label>

  <input
    type="text"
    {...register("genericName", {
      required: "Generic name is required",
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.genericName && (
    <p className="mt-1 text-sm text-red-500">
      {errors.genericName.message}
    </p>
  )}
</div>

    <div>
  <label className="mb-1 block font-medium">
    Company
  </label>

  <input
    type="text"
    {...register("company", {
      required: "Company is required",
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.company && (
    <p className="mt-1 text-sm text-red-500">
      {errors.company.message}
    </p>
  )}
</div>

    <div>
  <label className="mb-1 block font-medium">
    Category
  </label>

  <select
    {...register("category", {
      required: "Category is required",
    })}
    className="w-full rounded-lg border p-2"
    defaultValue=""
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
    <p className="mt-1 text-sm text-red-500">
      {errors.category.message}
    </p>
  )}
</div>

     <div>
  <label className="mb-1 block font-medium">
    Batch Number
  </label>

  <input
    type="text"
    {...register("batchNumber", {
      required: "Batch Number is required",
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.batchNumber && (
    <p className="mt-1 text-sm text-red-500">
      {errors.batchNumber.message}
    </p>
  )}
</div>

 {/* Manufacturing Date */}
<div>
  <label className="mb-1 block font-medium">
    Manufacturing Date
  </label>

  <input
    type="date"
    {...register("manufacturingDate", {
      required: "Manufacturing date is required",
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.manufacturingDate && (
    <p className="mt-1 text-sm text-red-500">
      {errors.manufacturingDate.message}
    </p>
  )}
</div>

{/* Expiry Date */}
<div>
  <label className="mb-1 block font-medium">
    Expiry Date
  </label>

  <input
    type="date"
    {...register("expiryDate", {
      required: "Expiry date is required",
      validate: (value) =>
        new Date(value) > new Date(watch("manufacturingDate")) ||
        "Expiry date must be after manufacturing date",
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.expiryDate && (
    <p className="mt-1 text-sm text-red-500">
      {errors.expiryDate.message}
    </p>
  )}
</div>

{/* Purchase Price */}
<div>
  <label className="mb-1 block font-medium">
    Purchase Price
  </label>

  <input
    type="number"
    step="0.01"
    {...register("purchasePrice", {
      required: "Purchase Price is required",
      min: {
        value: 0,
        message: "Purchase price cannot be negative",
      },
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.purchasePrice && (
    <p className="mt-1 text-sm text-red-500">
      {errors.purchasePrice.message}
    </p>
  )}
</div>

{/* Selling Price */}
<div>
  <label className="mb-1 block font-medium">
    Selling Price
  </label>

  <input
    type="number"
    step="0.01"
    {...register("sellingPrice", {
      required: "Selling Price is required",
      min: {
        value: 0,
        message: "Selling price cannot be negative",
      },
      validate: (value) =>
        Number(value) >= Number(watch("purchasePrice")) ||
        "Selling price should be greater than or equal to Purchase Price",
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.sellingPrice && (
    <p className="mt-1 text-sm text-red-500">
      {errors.sellingPrice.message}
    </p>
  )}
</div>

{/* Stock Quantity */}
<div>
  <label className="mb-1 block font-medium">
    Stock Quantity
  </label>

  <input
    type="number"
    {...register("stock", {
      required: "Stock Quantity is required",
      min: {
        value: 0,
        message: "Stock cannot be negative",
      },
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.stock && (
    <p className="mt-1 text-sm text-red-500">
      {errors.stock.message}
    </p>
  )}
</div>

{/* Unit */}
<div>
  <label className="mb-1 block font-medium">
    Unit
  </label>

  <select
    {...register("unit", {
      required: "Unit is required",
    })}
    defaultValue=""
    className="w-full rounded-lg border p-2"
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
    <p className="mt-1 text-sm text-red-500">
      {errors.unit.message}
    </p>
  )}
</div>

{/* GST */}
<div>
  <label className="mb-1 block font-medium">
    GST %
  </label>

  <select
    {...register("gst", {
      required: "GST is required",
    })}
    defaultValue=""
    className="w-full rounded-lg border p-2"
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
    <p className="mt-1 text-sm text-red-500">
      {errors.gst.message}
    </p>
  )}
</div>

{/* Description */}
<div className="md:col-span-2">
  <label className="mb-1 block font-medium">
    Description
  </label>

  <textarea
    rows={4}
    {...register("description")}
    className="w-full rounded-lg border p-2"
  />
</div>

{/* Medicine Image */}
<div className="md:col-span-2">
  <label className="mb-1 block font-medium">
    Medicine Image
  </label>

  <input
    type="file"
    accept="image/*"
    {...register("medicineImage", {
      required: "Medicine image is required",
      validate: {
        imageType: (files) => {
          if (!files || files.length === 0) {
            return "Medicine image is required";
          }

          return (
            files[0].type.startsWith("image/") ||
            "Only image files are allowed"
          );
        },
      },
    })}
    className="w-full rounded-lg border p-2"
  />

  {errors.medicineImage && (
    <p className="mt-1 text-sm text-red-500">
      {errors.medicineImage.message}
    </p>
  )}
</div>

{/* Buttons */}
<div className="md:col-span-2 flex justify-end gap-4">
  <button
    type="button"
    onClick={() => reset()}
    className="rounded-lg border px-6 py-2 hover:bg-gray-100"
  >
    Reset
  </button>

  <button
    type="submit"
    className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
  >
    {defaultValues
  ? "Update Medicine"
  : "Save Medicine"}
  </button>
</div>
    </form>
  );
}

export default MedicineForm;