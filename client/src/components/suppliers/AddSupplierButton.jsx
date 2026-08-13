import { Plus } from "lucide-react";

const AddSupplierButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        items-center
        justify-center
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
        duration-200

        hover:bg-blue-700
        hover:shadow-md

        focus:outline-none
        focus:ring-4
        focus:ring-blue-100

        active:scale-[0.98]

        dark:bg-blue-500
        dark:hover:bg-blue-600
        dark:focus:ring-blue-950
      "
    >
      <Plus size={18} />

      <span>Add Supplier</span>
    </button>
  );
};

export default AddSupplierButton;