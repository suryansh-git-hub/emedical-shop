import { X } from "lucide-react";

function UserModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-slate-900/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={onClose}
    >
      <div
        className="
          w-full
          max-w-xl
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
        onMouseDown={(e) => e.stopPropagation()}
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            bg-white
            px-6
            py-4
          "
        >
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {title === "Edit User"
                ? "Update user information"
                : "Create a new system user"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

export default UserModal;