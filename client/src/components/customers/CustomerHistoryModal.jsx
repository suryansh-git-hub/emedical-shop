import {
  X,
  Download,
  UserRound,
  ShoppingCart,
  IndianRupee,
  Star,
  CalendarDays,
  FileText,
} from "lucide-react";

import { generateCustomerHistoryPDF } from "../../utils/generateCustomerHistoryPDF";

const CustomerHistoryModal = ({
  isOpen,
  onClose,
  history,
}) => {
  if (!isOpen || !history) return null;

  const customer = history.customer || {};
  const sales = history.sales || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

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
            bg-white
            px-6
            py-5

            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <div className="flex items-center gap-4">

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
              <UserRound size={23} />
            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900

                  dark:text-slate-100
                "
              >
                Customer Purchase History
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Purchase details of{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {customer.customerName || "Customer"}
                </span>
              </p>

            </div>

          </div>

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
          >
            <X size={20} />
          </button>

        </div>

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="overflow-y-auto">

          {/* Customer Details */}

          <div
            className="
              border-b
              border-slate-100
              bg-slate-50/60
              px-6
              py-6

              dark:border-slate-800
              dark:bg-slate-950/30
            "
          >

            <div className="grid gap-5 lg:grid-cols-2">

              {/* Customer Information */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5

                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >

                <div className="mb-5 flex items-center gap-3">

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
                    <UserRound size={18} />
                  </div>

                  <div>

                    <h3
                      className="
                        font-semibold
                        text-slate-900

                        dark:text-slate-100
                      "
                    >
                      Customer Details
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Contact information
                    </p>

                  </div>

                </div>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Name
                    </span>

                    <span className="text-right font-semibold text-slate-800 dark:text-slate-200">
                      {customer.customerName || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Contact
                    </span>

                    <span className="text-right text-slate-700 dark:text-slate-300">
                      {customer.contactNumber || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Email
                    </span>

                    <span className="max-w-[60%] truncate text-right text-slate-700 dark:text-slate-300">
                      {customer.email || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Address
                    </span>

                    <span className="max-w-[60%] text-right text-slate-700 dark:text-slate-300">
                      {customer.address || "—"}
                    </span>
                  </div>

                </div>

              </div>

              {/* Statistics */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">

                {/* Total Orders */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-blue-100
                    bg-blue-50
                    p-5

                    dark:border-blue-900/50
                    dark:bg-blue-950/30
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
                        bg-white
                        text-blue-600

                        dark:bg-slate-900
                        dark:text-blue-400
                      "
                    >
                      <ShoppingCart size={18} />
                    </div>

                    <div>

                      <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Total Orders
                      </h3>

                      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {history.totalOrders || 0}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Total Spent */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-emerald-100
                    bg-emerald-50
                    p-5

                    dark:border-emerald-900/50
                    dark:bg-emerald-950/30
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
                        bg-white
                        text-emerald-600

                        dark:bg-slate-900
                        dark:text-emerald-400
                      "
                    >
                      <IndianRupee size={18} />
                    </div>

                    <div>

                      <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Total Spent
                      </h3>

                      <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        ₹
                        {Number(
                          history.totalSpent || 0
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Reward Points */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-yellow-100
                    bg-yellow-50
                    p-5

                    dark:border-yellow-900/50
                    dark:bg-yellow-950/30
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
                        bg-white
                        text-yellow-600

                        dark:bg-slate-900
                        dark:text-yellow-400
                      "
                    >
                      <Star size={18} />
                    </div>

                    <div>

                      <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Reward Points
                      </h3>

                      <p className="mt-1 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {customer.rewardPoints || 0}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              Purchase History
          ========================================== */}

          <div className="px-6 py-6">

            <div className="mb-5">

              <h3
                className="
                  text-lg
                  font-bold
                  text-slate-900

                  dark:text-slate-100
                "
              >
                Purchase History
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Complete purchase records for this customer.
              </p>

            </div>

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

                <table className="min-w-[850px] w-full">

                  <thead
                    className="
                      bg-slate-50

                      dark:bg-slate-800/70
                    "
                  >

                    <tr>

                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Invoice
                      </th>

                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Date
                      </th>

                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Medicines
                      </th>

                      <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Amount
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                    {sales.length === 0 ? (

                      <tr>

                        <td
                          colSpan={4}
                          className="py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                        >
                          No purchase history available.
                        </td>

                      </tr>

                    ) : (

                      sales.map((sale) => (

                        <tr
                          key={sale._id}
                          className="
                            transition-colors
                            hover:bg-slate-50

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

                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {sale.invoiceNumber || "—"}
                              </span>

                            </div>

                          </td>

                          {/* Date */}

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">

                              <CalendarDays
                                size={16}
                                className="text-slate-400"
                              />

                              {sale.saleDate
                                ? new Date(
                                    sale.saleDate
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

                              {(sale.medicines || []).map(
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

                                    <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                                      💊{" "}
                                      {item.medicine?.medicineName ||
                                        "Medicine"}
                                    </span>

                                    <span
                                      className="
                                        shrink-0
                                        rounded-lg
                                        bg-blue-100
                                        px-2.5
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-blue-700

                                        dark:bg-blue-950/60
                                        dark:text-blue-300
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

                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              ₹
                              {Number(
                                sale.totalAmount || 0
                              ).toLocaleString("en-IN")}
                            </span>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

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

          <button
            type="button"
            onClick={() =>
              generateCustomerHistoryPDF(history)
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-emerald-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-emerald-700
            "
          >
            <Download size={17} />
            Download PDF
          </button>

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

        </div>

      </div>

    </div>
  );
};

export default CustomerHistoryModal;