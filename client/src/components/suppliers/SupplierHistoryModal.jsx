import {
  X,
  Download,
  Building2,
  ShoppingCart,
  IndianRupee,
  CalendarDays,
  FileText,
} from "lucide-react";

import { generateSupplierHistoryPDF } from "../../utils/generateSupplierHistoryPDF";

const SupplierHistoryModal = ({
  isOpen,
  onClose,
  history,
}) => {
  if (!isOpen || !history) return null;

  const purchases = history.purchases || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-6xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl

          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        {/* ==========================================
            HEADER
        ========================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            px-6
            py-5

            dark:border-slate-800
          "
        >

          <div className="flex items-center gap-4">

            {/* Icon */}

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-blue-600

                dark:bg-blue-950/50
                dark:text-blue-400
              "
            >
              <Building2 size={23} />
            </div>

            {/* Title */}

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900

                  dark:text-slate-100
                "
              >
                Purchase History
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                {history.supplier?.supplierName || "Supplier"}
              </p>

            </div>

          </div>

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition

              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            title="Close"
          >
            <X size={20} />
          </button>

        </div>

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="overflow-y-auto">

          {/* ==========================================
              Supplier Information
          ========================================== */}

          <div
            className="
              border-b
              border-slate-100
              bg-slate-50/50
              px-6
              py-5

              dark:border-slate-800
              dark:bg-slate-950/40
            "
          >

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Supplier */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4

                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600

                      dark:bg-blue-950/50
                      dark:text-blue-400
                    "
                  >
                    <Building2 size={18} />
                  </div>

                  <div className="min-w-0">

                    <p
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      Supplier
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        font-semibold
                        text-slate-800

                        dark:text-slate-100
                      "
                    >
                      {history.supplier?.supplierName || "—"}
                    </p>

                  </div>

                </div>

              </div>

              {/* Total Purchases */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4

                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-50
                      text-emerald-600

                      dark:bg-emerald-950/50
                      dark:text-emerald-400
                    "
                  >
                    <ShoppingCart size={18} />
                  </div>

                  <div>

                    <p
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      Total Purchases
                    </p>

                    <p
                      className="
                        mt-1
                        text-xl
                        font-bold
                        text-slate-800

                        dark:text-slate-100
                      "
                    >
                      {history.totalPurchases || 0}
                    </p>

                  </div>

                </div>

              </div>

              {/* Total Amount */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4

                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600

                      dark:bg-blue-950/50
                      dark:text-blue-400
                    "
                  >
                    <IndianRupee size={18} />
                  </div>

                  <div>

                    <p
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      Total Amount
                    </p>

                    <p
                      className="
                        mt-1
                        text-xl
                        font-bold
                        text-blue-600
                      "
                    >
                      ₹
                      {Number(
                        history.totalSpent || 0
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              Purchase List
          ========================================== */}

          <div className="px-6 py-6">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h3
                  className="
                    text-base
                    font-bold
                    text-slate-900

                    dark:text-slate-100
                  "
                >
                  Purchase Records
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  Complete purchase history for this supplier.
                </p>

              </div>

              <div
                className="
                  rounded-xl
                  bg-slate-100
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-slate-600

                  dark:bg-slate-800
                  dark:text-slate-300
                "
              >
                {purchases.length} record
                {purchases.length !== 1 ? "s" : ""}
              </div>

            </div>

            {/* ==========================================
                Empty State
            ========================================== */}

            {purchases.length === 0 ? (

              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-slate-200
                  bg-slate-50
                  px-6
                  py-14
                  text-center

                  dark:border-slate-700
                  dark:bg-slate-800/50
                "
              >

                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-slate-400
                    shadow-sm

                    dark:bg-slate-800
                    dark:text-slate-500
                  "
                >
                  <ShoppingCart size={25} />
                </div>

                <h3
                  className="
                    mt-4
                    font-semibold
                    text-slate-800

                    dark:text-slate-100
                  "
                >
                  No Purchases Found
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  There are no purchase records for this supplier.
                </p>

              </div>

            ) : (

              /* ==========================================
                  Purchase Table
              ========================================== */

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200

                  dark:border-slate-700
                "
              >

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[850px]">

                    {/* Header */}

                    <thead className="bg-slate-50 dark:bg-slate-800/70">

                      <tr>

                        <th
                          className="
                            px-5
                            py-3.5
                            text-left
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Invoice
                        </th>

                        <th
                          className="
                            px-5
                            py-3.5
                            text-left
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Date
                        </th>

                        <th
                          className="
                            px-5
                            py-3.5
                            text-left
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Medicines
                        </th>

                        <th
                          className="
                            px-5
                            py-3.5
                            text-right
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Amount
                        </th>

                      </tr>

                    </thead>

                    {/* Body */}

                    <tbody
                      className="
                        divide-y
                        divide-slate-100

                        dark:divide-slate-800
                      "
                    >

                      {purchases.map((purchase) => (

                        <tr
                          key={purchase._id}
                          className="
                            transition-colors
                            hover:bg-slate-50/70

                            dark:hover:bg-slate-800/50
                          "
                        >

                          {/* Invoice */}

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-3">

                              <div
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-blue-50
                                  text-blue-600

                                  dark:bg-blue-950/50
                                  dark:text-blue-400
                                "
                              >
                                <FileText size={16} />
                              </div>

                              <span
                                className="
                                  font-semibold
                                  text-slate-800

                                  dark:text-slate-100
                                "
                              >
                                {purchase.invoiceNumber || "—"}
                              </span>

                            </div>

                          </td>

                          {/* Date */}

                          <td className="px-5 py-5">

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-600

                                dark:text-slate-300
                              "
                            >

                              <CalendarDays
                                size={16}
                                className="text-slate-400"
                              />

                              {purchase.purchaseDate
                                ? new Date(
                                    purchase.purchaseDate
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "—"}

                            </div>

                          </td>

                          {/* Medicines */}

                          <td className="px-5 py-5">

                            <div className="max-w-md space-y-2">

                              {(purchase.medicines || []).map(
                                (item, index) => (

                                  <div
                                    key={index}
                                    className="
                                      flex
                                      items-center
                                      justify-between
                                      gap-3
                                      rounded-xl
                                      bg-slate-50
                                      px-3
                                      py-2

                                      dark:bg-slate-800
                                    "
                                  >

                                    <div className="flex min-w-0 items-center gap-2">

                                      <span>💊</span>

                                      <span
                                        className="
                                          truncate
                                          text-sm
                                          font-medium
                                          text-slate-700

                                          dark:text-slate-200
                                        "
                                      >
                                        {item.medicine?.medicineName ||
                                          "Medicine"}
                                      </span>

                                    </div>

                                    <span
                                      className="
                                        shrink-0
                                        rounded-lg
                                        bg-blue-50
                                        px-2.5
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-blue-600

                                        dark:bg-blue-950/50
                                        dark:text-blue-400
                                      "
                                    >
                                      Qty: {item.quantity}
                                    </span>

                                  </div>

                                )
                              )}

                            </div>

                          </td>

                          {/* Amount */}

                          <td className="px-5 py-5 text-right">

                            <span
                              className="
                                text-sm
                                font-bold
                                text-slate-800

                                dark:text-slate-100
                              "
                            >
                              ₹
                              {Number(
                                purchase.totalAmount || 0
                              ).toLocaleString("en-IN")}
                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

          </div>

        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-slate-100
            bg-slate-50/50
            px-6
            py-4
            sm:flex-row
            sm:justify-end

            dark:border-slate-800
            dark:bg-slate-950/40
          "
        >

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition

              hover:bg-slate-100

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:bg-slate-700
            "
          >
            Close
          </button>

          {/* Download */}

          <button
            type="button"
            onClick={() =>
              generateSupplierHistoryPDF(history)
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition

              hover:bg-blue-700

              dark:bg-blue-500
              dark:hover:bg-blue-600
            "
          >
            <Download size={17} />
            Download PDF
          </button>

        </div>

      </div>

    </div>
  );
};

export default SupplierHistoryModal;