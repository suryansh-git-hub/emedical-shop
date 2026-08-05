import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
const SalesForm = ({
  formData,
  setFormData,
  customers,
  medicines,
  onSubmit,selectedMedicine
}) => {
  // ==========================
// Pre-select Medicine
// ==========================

useEffect(() => {
  if (selectedMedicine) {
    const medicine = medicines.find(
      (m) => m._id === selectedMedicine._id
    );

    setFormData((prev) => ({
      ...prev,
      medicines: prev.medicines.map((item, index) =>
        index === 0
          ? {
              ...item,
              medicine: selectedMedicine._id,
              sellingPrice: medicine?.sellingPrice || "",
              gst: medicine?.gst || 0,
          
            }
          : item
      ),
    }));
  }
}, [selectedMedicine, medicines, setFormData]);
  // ==========================
  // Basic Fields
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

// ==========================
// Medicine Change
// ==========================

const handleMedicineChange = (
  index,
  field,
  value
) => {
  const updatedMedicines = [...formData.medicines];

  updatedMedicines[index][field] = value;

  if (field === "medicine") {
    const selectedMedicine = medicines.find(
      (medicine) => medicine._id === value
    );

    if (selectedMedicine) {
      updatedMedicines[index].sellingPrice =
        selectedMedicine.sellingPrice;

      updatedMedicines[index].gst =
        selectedMedicine.gst || 0;
    }
  }

  setFormData((prev) => ({
    ...prev,
    medicines: updatedMedicines,
  }));
};

// ==========================
// Add Medicine
// ==========================

const addMedicine = () => {
  setFormData((prev) => ({
    ...prev,
    medicines: [
      ...prev.medicines,
      {
        medicine: "",
        quantity: 1,
        sellingPrice: "",
        gst: 0,
      },
    ],
  }));
};

// ==========================
// Remove Medicine
// ==========================

const removeMedicine = (index) => {
  if (formData.medicines.length === 1) return;

  const updatedMedicines =
    formData.medicines.filter(
      (_, i) => i !== index
    );

  setFormData((prev) => ({
    ...prev,
    medicines: updatedMedicines,
  }));
};

// ==========================
// Live Bill Calculation
// ==========================

// Subtotal
const subtotal = formData.medicines.reduce(
  (sum, item) =>
    sum +
    Number(item.quantity || 0) *
      Number(item.sellingPrice || 0),
  0
);

// GST
const gstAmount = formData.medicines.reduce(
  (sum, item) => {
    return (
      sum +
      (Number(item.quantity || 0) *
        Number(item.sellingPrice || 0) *
        Number(item.gst || 0)) /
        100
    );
  },
  0
);

// Discount
let discountAmount = 0;

if (formData.discountType === "percentage") {
  discountAmount =
    (subtotal * Number(formData.discount || 0)) /
    100;
} else {
  discountAmount = Number(
    formData.discount || 0
  );
}

// Prevent discount greater than subtotal
discountAmount = Math.min(
  discountAmount,
  subtotal + gstAmount
);

// Grand Total
const grandTotal = Math.max(
  subtotal + gstAmount - discountAmount,
  0
);

// Return Amount
const returnAmount =
  formData.paymentMethod === "Cash"
    ? Math.max(
        Number(formData.cashReceived || 0) -
          grandTotal,
        0
      )
    : 0;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      {/* Customer */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Customer
        </label>

        <select
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (
            <option
              key={customer._id}
              value={customer._id}
            >
              {customer.customerName}
            </option>
          ))}
        </select>
      </div>

      {/* Sale Date */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Sale Date
        </label>

        <input
          type="date"
          name="saleDate"
          value={formData.saleDate}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Medicines */}

      <div className="space-y-5">

        <div className="flex items-center justify-between">
         <h2 className="text-lg font-semibold">
  {selectedMedicine ? "Reduce Stock" : "Medicines"}
</h2>

        {!selectedMedicine && (
  <button
    type="button"
    onClick={addMedicine}
    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
  >
    <Plus size={18} />
    Add Medicine
  </button>
)}
        </div>

        {formData.medicines.map(
          (item, index) => (
            <div
              key={index}
              className="rounded-xl border p-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                {/* Medicine */}

                <div>
                  <label className="mb-2 block text-sm">
                    Medicine
                  </label>

                <select
  value={item.medicine}
  onChange={(e) =>
    handleMedicineChange(
      index,
      "medicine",
      e.target.value
    )
  }
  required
  disabled={!!selectedMedicine && index === 0}
  className={`w-full rounded-lg border p-3 ${
    selectedMedicine && index === 0
      ? "cursor-not-allowed bg-gray-100"
      : ""
  }`}
>
                    <option value="">
                      Select Medicine
                    </option>

                    {medicines.map((medicine) => (
                      <option
                        key={medicine._id}
                        value={medicine._id}
                      >
                        {medicine.medicineName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}

                <div>
                  <label className="mb-2 block text-sm">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1" step={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    required
                    className="w-full rounded-lg border p-3"
                  />
                </div>

                {/* Selling Price */}

                <div>
                  <label className="mb-2 block text-sm">
                    Selling Price
                  </label>

                  <input
                    type="number"
                    value={item.sellingPrice}
                    readOnly
                    className="w-full rounded-lg border bg-gray-100 p-3"
                  />
                </div>

                {/* Remove */}

               <div className="flex items-end">
  {!selectedMedicine && (
    <button
      type="button"
      onClick={() => removeMedicine(index)}
      className="w-full rounded-lg bg-red-500 p-3 text-white hover:bg-red-600"
    >
      <Trash2 size={18} />
    </button>
  )}
</div>

              </div>
            </div>
          )
        )}

      </div>

      {/* Billing Details */}

<div className="rounded-xl border p-5">

  <h2 className="mb-5 text-lg font-semibold">
    Billing Details
  </h2>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

    {/* Discount Type */}

    <div>
      <label className="mb-2 block text-sm font-medium">
        Discount Type
      </label>

      <select
        name="discountType"
        value={formData.discountType}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option value="flat">
          Flat (₹)
        </option>

        <option value="percentage">
          Percentage (%)
        </option>

      </select>
    </div>

    {/* Discount */}

    <div>
      <label className="mb-2 block text-sm font-medium">
        Discount
      </label>

      <input
        type="number"
        min="0"
        name="discount"
        value={formData.discount}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />
    </div>

    {/* Payment Method */}

    <div>
      <label className="mb-2 block text-sm font-medium">
        Payment Method
      </label>

      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option>Cash</option>
        <option>UPI</option>
        <option>Card</option>
        <option>Net Banking</option>
      </select>
    </div>

    {/* Cash Received */}

   {formData.paymentMethod === "Cash" && (
  <div>
    <label className="mb-2 block text-sm font-medium">
      Cash Received
    </label>

    <input
      type="number"
      min="0"
      step="0.01"
      name="cashReceived"
      value={formData.cashReceived}
      onChange={handleChange}
      placeholder="Enter Amount"
      className="w-full rounded-lg border p-3"
    />
  </div>
)}

  </div>

  {/* Notes */}

  <div className="mt-5">

    <label className="mb-2 block text-sm font-medium">
      Notes
    </label>

    <textarea
      rows={3}
      name="notes"
      value={formData.notes}
      onChange={handleChange}
      placeholder="Optional Notes..."
      className="w-full rounded-lg border p-3"
    />

  </div>

</div>

     {/* Billing Summary */}

<div className="rounded-xl border bg-gray-50 p-6">

  <h2 className="mb-5 text-lg font-semibold">
    Billing Summary
  </h2>

  <div className="space-y-3">

<div className="flex justify-between text-gray-700">
      <span>Subtotal</span>

      <span>
        ₹{subtotal.toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between">
      <span>GST</span>

      <span>
        ₹{gstAmount.toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Discount</span>

      <span className="text-red-600">
        - ₹{discountAmount.toFixed(2)}
      </span>
    </div>

    <hr />

    <div className="flex justify-between text-lg font-bold">

      <span>Grand Total</span>

      <span className="text-green-600">
        ₹{grandTotal.toFixed(2)}
      </span>

    </div>

    <hr />

   {formData.paymentMethod === "Cash" && (
  <>
    <div className="flex justify-between">
      <span>Cash Received</span>

      <span>
        ₹{Number(
          formData.cashReceived || 0
        ).toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Return Amount</span>

      <span className="font-semibold text-blue-600">
        ₹{returnAmount.toFixed(2)}
      </span>
    </div>
  </>
)}

    <div className="flex justify-between">
      <span>Return Amount</span>

      <span className="font-semibold text-blue-600">
        ₹{returnAmount.toFixed(2)}
      </span>
    </div>

  </div>

</div>

      {/* Submit */}

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
      {selectedMedicine
  ? "Reduce Stock"
  : "Generate Invoice"}

      </button>
    </form>
  );
};

export default SalesForm;