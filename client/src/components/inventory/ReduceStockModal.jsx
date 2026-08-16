import { useEffect, useState } from "react";
import { MinusCircle, X } from "lucide-react";

// ==========================================
// Reduce Stock Modal
//
// Replaces the old window.prompt() box with
// a proper modal that matches the rest of the
// app's design. Used for quick corrections
// (damage, expiry write-off, count fix) â€”
// increases still go through Purchases so
// they stay properly recorded.
// ==========================================

const ReduceStockModal = ({
  isOpen,
  medicineName,
  currentStock,
  submitting,
  onClose,
  onConfirm,
}) => {
  const [quantity, setQuantity] =
    useState("1");

  const [error, setError] = useState("");

  // ========================================
  // Reset every time the modal opens
  // ========================================

  useEffect(() => {
    if (isOpen) {
      setQuantity("1");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ========================================
  // Submit
  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = Number(quantity);

    if (
      !Number.isInteger(value) ||
      value <= 0
    ) {
      setError(
        "Enter a whole number greater than 0."
      );
      return;
    }

    if (value > Number(currentStock || 0)) {
      setError(
        `Only ${currentStock} units are available.`
      );
      return;
    }

    onConfirm(value);
  };

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
      <div
        className="
          w-full
          max-w-sm
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl

          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-5
            py-4

            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-orange-50
                text-orange-600

                dark:bg-orange-950/40
                dark:text-orange-400
              "
            >
              <MinusCircle size={17} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Reduce Stock
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {medicineName || "This medicine"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-1.5
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-600

              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-3 px-5 py-5">
            <p className="text-xs text-slate-500 dark:text-slate-400">
          
            </p>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Quantity to remove
              </label>

              <input
                type="number"
                min="1"
                autoFocus
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setError("");
                }}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3.5
                  py-2.5
                  text-sm
                  text-slate-700
                  outline-none
                  transition

                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-100

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:focus:border-blue-500
                  dark:focus:ring-blue-950
                "
              />

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Currently in stock: {currentStock}
              </p>

              {error && (
                <p className="mt-1 text-xs text-red-500">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-2
              border-t
              border-slate-200
              px-5
              py-4

              dark:border-slate-800
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="
                rounded-xl
                border
                border-slate-200
                px-4
                py-2
                text-sm
                font-semibold
                text-slate-600
                transition
                hover:bg-slate-50

                disabled:cursor-not-allowed
                disabled:opacity-50

                dark:border-slate-700
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="
                rounded-xl
                bg-orange-500
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-orange-600

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {submitting
                ? "Removing..."
                : "Remove Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReduceStockModal;