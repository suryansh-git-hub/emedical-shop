import { Trash2, Plus } from "lucide-react";
import { useEffect } from "react";

const PurchaseForm = ({
  formData,
  setFormData,
  suppliers,
  medicines,
  onSubmit,
  selectedMedicine,
}) => {
  useEffect(() => {
    if (selectedMedicine) {
      setFormData((prev) => ({
        ...prev,
        medicines: prev.medicines.map((medicine, index) =>
          index === 0
            ? {
                ...medicine,
                medicine: selectedMedicine._id,
              }
            : medicine
        ),
      }));
    }
  }, [selectedMedicine, setFormData]);

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
  const handleMedicineChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      medicines: prev.medicines.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
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
          purchasePrice: "",
        },
      ],
    }));
  };

  // ==========================
  // Remove Medicine
  // ==========================
  const removeMedicine = (index) => {
    if (formData.medicines.length === 1) return;

    const updatedMedicines = formData.medicines.filter(
      (_, i) => i !== index
    );

    setFormData((prev) => ({
      ...prev,
      medicines: updatedMedicines,
    }));
  };

  // ==========================
  // Live Total
  // ==========================
  const totalAmount = formData.medicines.reduce((sum, item) => {
    return (
      sum +
      Number(item.quantity || 0) * Number(item.purchasePrice || 0)
    );
  }, 0);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Supplier */}
      <div>
        <label className="mb-2 block text-sm font-medium">Supplier</label>
        <select
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.supplierName}
            </option>
          ))}
        </select>
      </div>

      {/* Invoice */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Invoice Number
        </label>
        <input
          type="text"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
          placeholder="Enter Invoice Number"
        />
      </div>

      {/* Purchase Date */}
      <div>
        <label className="mb-2 block text-sm font-medium">Purchase Date</label>
        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Medicines */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {selectedMedicine ? "Increase Stock" : "Medicines"}
          </h2>
          <button
            type="button"
            onClick={addMedicine}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <Plus size={18} />
            Add Medicine
          </button>
        </div>

        {formData.medicines.map((item, index) => (
          <div key={index} className="rounded-xl border p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* Medicine */}
              <div>
                <label className="mb-2 block text-sm">Medicine</label>
                <select
                  value={item.medicine}
                  onChange={(e) =>
                    handleMedicineChange(index, "medicine", e.target.value)
                  }
                  required
                  disabled={!!selectedMedicine && index === 0}
                  className={`w-full rounded-lg border p-3 ${
                    selectedMedicine && index === 0
                      ? "cursor-not-allowed bg-gray-100"
                      : ""
                  }`}
                >
                  <option value="">Select Medicine</option>
                  {medicines.map((medicine) => (
                    <option key={medicine._id} value={medicine._id}>
                      {medicine.medicineName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleMedicineChange(index, "quantity", e.target.value)
                  }
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              {/* Purchase Price */}
              <div>
                <label className="mb-2 block text-sm">Purchase Price</label>
                <input
                  type="number"
                  min="0"
                  value={item.purchasePrice}
                  onChange={(e) =>
                    handleMedicineChange(
                      index,
                      "purchasePrice",
                      e.target.value
                    )
                  }
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              {/* Remove */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeMedicine(index)}
                  className="w-full rounded-lg bg-red-500 p-3 text-white hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Total Amount</span>
          <span className="text-2xl font-bold text-green-600">
            ₹{totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Save Purchase
      </button>
    </form>
  );
};

export default PurchaseForm;