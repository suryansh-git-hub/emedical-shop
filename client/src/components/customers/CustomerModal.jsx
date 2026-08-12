import { X, UserRound } from "lucide-react";

const CustomerModal = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {/* ==========================
            Header
        ========================== */}

        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserRound size={19} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Customer Details
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Add or update customer information
              </p>
            </div>

          </div>

          {/* Close Button */}

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
            title="Close"
          >
            <X size={20} />
          </button>

        </div>

        {/* ==========================
            Body
        ========================== */}

        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-7">
          {children}
        </div>

      </div>

    </div>
  );
};

export default CustomerModal;