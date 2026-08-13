import { Plus, ShoppingCart } from "lucide-react";

const AddPurchaseButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-blue-600
        px-5
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

        dark:focus:ring-blue-950
      "
    >
      <ShoppingCart size={18} />

      <span>Add Purchase</span>

      <Plus size={16} />
    </button>
  );
};

export default AddPurchaseButton;