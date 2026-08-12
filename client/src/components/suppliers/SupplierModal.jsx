import { X, Building2 } from "lucide-react";

const SupplierModal = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">

      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

        {/* ==========================================
            Header
        ========================================== */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Building2 size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Supplier Details
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Add or update supplier information
              </p>
            </div>

          </div>

          {/* Close */}

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
              hover:bg-slate-100
              hover:text-slate-700
            "
            title="Close"
          >
            <X size={19} />
          </button>

        </div>

        {/* ==========================================
            Body
        ========================================== */}

        <div className="overflow-y-auto px-6 py-6">
          {children}
        </div>

      </div>

    </div>
  );
};

export default SupplierModal;