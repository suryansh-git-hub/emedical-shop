import { Plus } from "lucide-react";

function AddMedicineButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
    >
      <Plus size={18} />
      Add Medicine
    </button>
  );
}

export default AddMedicineButton;