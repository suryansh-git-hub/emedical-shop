import { Plus } from "lucide-react";

function AddUserButton({ onClick }) {
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
        hover:bg-blue-700
        hover:shadow-md
        focus:outline-none
        focus:ring-4
        focus:ring-blue-100
        dark:focus:ring-blue-950
        active:scale-[0.98]
      "
    >
      <Plus size={18} />

      Add User
    </button>
  );
}

export default AddUserButton;