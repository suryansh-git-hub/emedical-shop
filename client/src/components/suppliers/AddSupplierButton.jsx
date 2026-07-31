import { Plus } from "lucide-react";

const AddSupplierButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium transition hover:bg-blue-700"
    >
      <Plus size={18} />

      <span>Add Supplier</span>
    </button>
  );
};

export default AddSupplierButton;