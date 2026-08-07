function UserModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 transition hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

export default UserModal;