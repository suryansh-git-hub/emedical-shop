import { Plus } from "lucide-react";

const AddCustomerButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full
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
        hover:bg-blue-700
        hover:shadow-md
        focus:outline-none
        focus:ring-4
        focus:ring-blue-100
        sm:w-auto
      "
    >
      <Plus size={18} />

      <span>Add Customer</span>
    </button>
  );
};

export default AddCustomerButton;