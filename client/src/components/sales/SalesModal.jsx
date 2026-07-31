const SalesModal = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-5xl rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            Create Bill
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 transition hover:text-red-500"
          >
            &times;
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

export default SalesModal;