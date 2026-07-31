import { Plus } from "lucide-react";

const AddPurchaseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      <Plus size={20} />
      Add Purchase
    </button>
  );
};

export default AddPurchaseButton;