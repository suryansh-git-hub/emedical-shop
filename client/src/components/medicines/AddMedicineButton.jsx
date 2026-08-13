import { Plus } from "lucide-react";

function AddMedicineButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-blue-600
        px-4
        py-2.5
        text-sm
        font-semibold
        text-white
        shadow-sm
        transition

        hover:bg-blue-700
        hover:shadow-md

        active:scale-[0.98]

        dark:bg-blue-500
        dark:hover:bg-blue-600
      "
    >
      <Plus size={18} />
      Add Medicine
    </button>
  );
}

export default AddMedicineButton;