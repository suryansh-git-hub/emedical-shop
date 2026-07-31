import { X } from "lucide-react";

const CustomerModal = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-semibold text-gray-800">
            Customer Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {children}
        </div>

      </div>

    </div>
  );
};

export default CustomerModal;