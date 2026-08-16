import {
  Trash2,
  Plus,
  ShoppingCart,
  Package,
  CalendarDays,
  FileText,
} from "lucide-react";
import { useEffect } from "react";

const PurchaseForm = ({
  formData,
  setFormData,
  suppliers,
  medicines,
  onSubmit,
  selectedMedicine,
}) => {
  // ==========================================
  // Selected Medicine
  // ==========================================

  useEffect(() => {
    if (selectedMedicine) {
      setFormData((prev) => ({
        ...prev,
        medicines: prev.medicines.map(
          (medicine, index) =>
            index === 0
              ? {
                  ...medicine,
                  medicine:
                    selectedMedicine._id,
                }
              : medicine
        ),
      }));
    }
  }, [selectedMedicine, setFormData]);

  // ==========================================
  // Basic Fields
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Medicine Change
  // ==========================================

  const handleMedicineChange = (
    index,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      medicines: prev.medicines.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                [field]: value,
              }
            : item
      ),
    }));
  };

  // ==========================================
  // Add Medicine
  // ==========================================

  const addMedicine = () => {
    setFormData((prev) => ({
      ...prev,
      medicines: [
        ...prev.medicines,
        {
          medicine: "",
          quantity: 1,
          purchasePrice: "",
        },
      ],
    }));
  };

  // ==========================================
  // Remove Medicine
  // ==========================================

  const removeMedicine = (index) => {
    if (formData.medicines.length === 1) {
      return;
    }

    const updatedMedicines =
      formData.medicines.filter(
        (_, i) => i !== index
      );

    setFormData((prev) => ({
      ...prev,
      medicines: updatedMedicines,
    }));
  };

  // ==========================================
  // Live Total
  // ==========================================

  const totalAmount =
    formData.medicines.reduce(
      (sum, item) => {
        return (
          sum +
          Number(item.quantity || 0) *
            Number(
              item.purchasePrice || 0
            )
        );
      },
      0
    );

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      {/* ==========================================
          Purchase Information
      ========================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6

          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <FileText size={19} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Purchase Information
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter supplier and invoice details.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Supplier */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Supplier
            </label>

            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              className="
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

                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
                dark:focus:border-blue-500
                dark:focus:bg-slate-800
                dark:focus:ring-blue-950
              "
            >
              <option value="">
                Select Supplier
              </option>

              {suppliers.map(
                (supplier) => (
                  <option
                    key={supplier._id}
                    value={supplier._id}
                  >
                    {supplier.supplierName}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Invoice */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Invoice Number
            </label>

            <div className="relative">

              <FileText
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  dark:text-slate-500
                "
              />

              <input
                type="text"
                name="invoiceNumber"
                value={
                  formData.invoiceNumber
                }
                onChange={handleChange}
                placeholder="Enter supplier's invoice number (optional)"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  py-3
                  pl-10
                  pr-4
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
                  dark:focus:ring-blue-950
                "
              />

            </div>

            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
              If this delivery came with a bill,
              enter that exact number here.
              Otherwise leave it blank and one
              will be generated for you.
            </p>
          </div>

          {/* Purchase Date */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Purchase Date
            </label>

            <div className="relative">

              <CalendarDays
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  dark:text-slate-500
                "
              />

              <input
                type="date"
                name="purchaseDate"
                value={
                  formData.purchaseDate
                }
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  text-slate-700
                  outline-none
                  transition

                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-100

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:focus:border-blue-500
                  dark:focus:bg-slate-800
                  dark:focus:ring-blue-950
                "
              />

            </div>
          </div>

        </div>

      </div>

      {/* ==========================================
          Medicines
      ========================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-6

          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* Section Header */}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Package size={19} />
            </div>

            <div>

              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {selectedMedicine
                  ? "Increase Stock"
                  : "Medicines"}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add medicines included in this purchase.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={addMedicine}
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-emerald-600
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-emerald-700

              focus:outline-none
              focus:ring-4
              focus:ring-emerald-100
              dark:focus:ring-emerald-950
            "
          >
            <Plus size={17} />

            Add Medicine
          </button>

        </div>

        {/* Medicine Items */}

        <div className="space-y-4">

          {formData.medicines.map(
            (item, index) => (

              <div
                key={index}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/70
                  p-4

                  dark:border-slate-700
                  dark:bg-slate-800/60
                "
              >

                {/* Medicine Number */}

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                      {index + 1}
                    </span>

                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Medicine {index + 1}
                    </span>

                  </div>

                  {formData.medicines
                    .length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeMedicine(
                          index
                        )
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-red-50
                        text-red-500
                        transition
                        hover:bg-red-100
                        hover:text-red-600

                        dark:bg-red-950/40
                        dark:text-red-400
                        dark:hover:bg-red-950/60
                        dark:hover:text-red-300
                      "
                      title="Remove medicine"
                    >
                      <Trash2
                        size={16}
                      />
                    </button>
                  )}

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                  {/* Medicine */}

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Medicine
                    </label>

                    <select
                      value={
                        item.medicine
                      }
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          "medicine",
                          e.target.value
                        )
                      }
                      required
                      disabled={
                        !!selectedMedicine &&
                        index === 0
                      }
                      className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:focus:border-blue-500 dark:focus:ring-blue-950 ${
                        selectedMedicine &&
                        index === 0
                          ? "cursor-not-allowed bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                          : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <option value="">
                        Select Medicine
                      </option>

                      {medicines.map(
                        (medicine) => (
                          <option
                            key={
                              medicine._id
                            }
                            value={
                              medicine._id
                            }
                          >
                            {
                              medicine.medicineName
                            }
                            {medicine.batchNumber
                              ? ` — Batch: ${medicine.batchNumber}`
                              : ""}
                            {" "}
                            (Stock:{" "}
                            {medicine.stock ?? 0}
                            )
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Quantity */}

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={
                        item.quantity
                      }
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-slate-700
                        outline-none
                        transition

                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100

                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-slate-200
                        dark:focus:border-blue-500
                        dark:focus:ring-blue-950
                      "
                    />
                  </div>

                  {/* Purchase Price */}

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Purchase Price
                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={
                          item.purchasePrice
                        }
                        onChange={(e) =>
                          handleMedicineChange(
                            index,
                            "purchasePrice",
                            e.target.value
                          )
                        }
                        required
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          py-3
                          pl-9
                          pr-4
                          text-sm
                          text-slate-700
                          outline-none
                          transition

                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-100

                          dark:border-slate-700
                          dark:bg-slate-800
                          dark:text-slate-200
                          dark:focus:border-blue-500
                          dark:focus:ring-blue-950
                        "
                      />

                    </div>
                  </div>

                </div>

                {/* Item Total */}

                <div className="mt-4 flex justify-end border-t border-slate-200 pt-3 dark:border-slate-700">

                  <p className="text-xs text-slate-500 dark:text-slate-400">

                    Item Total:{" "}

                    <span className="font-bold text-slate-700 dark:text-slate-200">

                      ₹
                      {(
                        Number(
                          item.quantity || 0
                        ) *
                        Number(
                          item.purchasePrice ||
                            0
                        )
                      ).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}

                    </span>

                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* ==========================================
          Total Amount
      ========================================== */}

      <div
        className="
          rounded-2xl
          border
          border-blue-100
          bg-blue-50
          p-5
          sm:p-6

          dark:border-blue-900/50
          dark:bg-blue-950/40
        "
      >

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400">
              <ShoppingCart size={19} />
            </div>

            <div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Total Purchase Amount
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calculated from all medicines.
              </p>

            </div>

          </div>

          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 sm:text-3xl">
            ₹
            {totalAmount.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </span>

        </div>

      </div>

      {/* ==========================================
          Submit
      ========================================== */}

      <button
        type="submit"
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          py-3.5
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
          dark:focus:ring-blue-950
        "
      >
        <ShoppingCart size={18} />

        Purchase
      </button>

    </form>
  );
};

export default PurchaseForm;