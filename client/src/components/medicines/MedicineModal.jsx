import { X, Pill } from "lucide-react";

function MedicineModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* ==========================================
          Backdrop
      ========================================== */}

      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ==========================================
          Modal
      ========================================== */}

      <div
        className="
          relative
          z-10
          flex
          max-h-[92vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >

        {/* ========================================
            Header
        ======================================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Pill
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {title}
              </h2>

              <p className="text-xs text-slate-500">
                Manage medicine information and inventory details
              </p>
            </div>

          </div>

          {/* Close Button */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
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
            <X size={20} />
          </button>

        </div>

        {/* ========================================
            Form Content
        ======================================== */}

        <div className="flex-1 overflow-y-auto bg-white px-6 py-6">

          {children}

        </div>

      </div>
    </div>
  );
}

export default MedicineModal;