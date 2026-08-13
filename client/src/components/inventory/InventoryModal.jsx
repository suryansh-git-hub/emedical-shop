import { X, History } from "lucide-react";

const InventoryModal = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
        dark:bg-black/70
      "
    >
      <div className="
        relative
        w-full
        max-w-4xl
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl
        dark:border-slate-800
        dark:bg-slate-900
      ">

        {/* Header */}

        <div className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white
          px-6
          py-4
          dark:border-slate-800
          dark:bg-slate-900
        ">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <History size={19} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Stock Movement History
              </h2>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                View all stock movements for this medicine
              </p>
            </div>

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
              rounded-xl
              text-slate-400
              transition
              hover:bg-red-50
              hover:text-red-500
              dark:hover:bg-red-950/40
              dark:hover:text-red-400
            "
            title="Close"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="
          max-h-[70vh]
          overflow-y-auto
          bg-slate-50/50
          p-6
          dark:bg-slate-950/30
        ">
          {children}
        </div>

      </div>
    </div>
  );
};

export default InventoryModal;