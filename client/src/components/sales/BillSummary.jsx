import {
  Star,
  Receipt,
  Gift,
  CreditCard,
  Tag,
  Wallet,
  CheckCircle2,
  Trash2,
  FileText,
} from "lucide-react";

const BillSummary = ({
  items = [],
  customer,

  // Reward points
  redeemRewardPoints,
  setRedeemRewardPoints,

  // Payment
  paymentMethod,
  setPaymentMethod,
  cashReceived,
  setCashReceived,

  // Actions
  onGenerateBill,
  onClearBill,
  saving,
}) => {
  // ==========================================
  // BILL CALCULATIONS
  // ==========================================

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) *
        Number(item.sellingPrice || 0),
    0
  );

  const gstAmount = items.reduce(
    (sum, item) =>
      sum +
      (Number(item.quantity || 0) *
        Number(item.sellingPrice || 0) *
        Number(item.gst || 0)) /
        100,
    0
  );

  // ==========================================
  // REWARD POINTS
  // ==========================================

  const availablePoints = Number(
    customer?.rewardPoints || 0
  );

  /*
   * Maximum points that can be redeemed.
   *
   * Points cannot exceed the current bill amount.
   */
  const maximumRewardDiscount = Math.min(
    availablePoints,
    Math.floor(subtotal + gstAmount)
  );

  /*
   * Reward discount is applied ONLY when
   * the customer chooses to redeem points.
   */
  const rewardDiscount = redeemRewardPoints
    ? maximumRewardDiscount
    : 0;

  // ==========================================
  // GRAND TOTAL
  // ==========================================

  const grandTotal = Math.max(
    0,
    subtotal +
      gstAmount -
      rewardDiscount
  );

  // ==========================================
  // REWARD POINTS EARNED
  // ==========================================

  const rewardEarned = Math.floor(
    grandTotal / 100
  );

  // ==========================================
  // CASH CHANGE
  // ==========================================

  const cashAmount = Number(
    cashReceived || 0
  );

  const changeToReturn =
    paymentMethod === "Cash" &&
    cashAmount >= grandTotal
      ? cashAmount - grandTotal
      : 0;

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-slate-100 px-6 py-6 sm:px-8">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
            <Receipt
              size={23}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Bill Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the amount before generating the bill.
            </p>
          </div>

        </div>

      </div>

      {/* =====================================================
          BILL BREAKDOWN
      ====================================================== */}

      <div className="px-6 pt-6 sm:px-8">

        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">

          {/* Subtotal */}

          <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4">

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <Receipt
                  size={15}
                  className="text-blue-600"
                />
              </div>

              <span className="text-sm font-medium text-slate-600">
                Subtotal
              </span>

            </div>

            <span className="text-sm font-semibold text-slate-800">
              {formatCurrency(subtotal)}
            </span>

          </div>

          {/* GST */}

          <div className="flex items-center justify-between border-b border-dashed border-slate-200 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                <Tag
                  size={15}
                  className="text-purple-600"
                />
              </div>

              <span className="text-sm font-medium text-slate-600">
                GST
              </span>

            </div>

            <span className="text-sm font-semibold text-slate-800">
              {formatCurrency(gstAmount)}
            </span>

          </div>

          {/* Reward Discount */}

          <div className="flex items-center justify-between pt-4">

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                <Gift
                  size={15}
                  className="text-green-600"
                />
              </div>

              <span className="text-sm font-medium text-slate-600">
                Reward Discount
              </span>

            </div>

            <span
              className={`text-sm font-semibold ${
                rewardDiscount > 0
                  ? "text-green-600"
                  : "text-slate-400"
              }`}
            >
              {rewardDiscount > 0
                ? `- ${formatCurrency(
                    rewardDiscount
                  )}`
                : formatCurrency(0)}
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          GRAND TOTAL
      ====================================================== */}

      <div className="px-6 py-5 sm:px-8">

        <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-5">

          <div>

            <p className="text-sm font-semibold text-blue-700">
              Grand Total
            </p>

            <p className="mt-1 text-3xl font-extrabold tracking-tight text-blue-700 sm:text-4xl">
              {formatCurrency(grandTotal)}
            </p>

          </div>

          <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm sm:flex">
            <Wallet size={23} />
          </div>

        </div>

      </div>

      {/* =====================================================
          REWARD POINTS
      ====================================================== */}

      <div className="mx-6 mb-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-5 sm:mx-8">

        {/* Reward Header */}

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
              <Gift
                size={21}
                className="text-amber-600"
              />
            </div>

            <div>

              <h3 className="font-bold text-slate-800">
                Reward Points
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Available:{" "}
                <span className="font-bold text-amber-600">
                  {availablePoints}
                </span>{" "}
                points
              </p>

            </div>

          </div>

          {/* Toggle */}

          <button
            type="button"
            disabled={availablePoints === 0}
            onClick={() =>
              setRedeemRewardPoints(
                !redeemRewardPoints
              )
            }
            className={`relative h-7 w-14 shrink-0 rounded-full transition ${
              redeemRewardPoints
                ? "bg-amber-500"
                : "bg-slate-300"
            } ${
              availablePoints === 0
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            aria-label="Toggle reward points"
            aria-pressed={
              redeemRewardPoints
            }
          >

            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                redeemRewardPoints
                  ? "left-8"
                  : "left-1"
              }`}
            />

          </button>

        </div>

        {/* Reward Details */}

        {availablePoints > 0 ? (

          <div className="mt-5 rounded-xl border border-slate-100 bg-white p-4">

            <div className="space-y-3">

              {/* Points Used */}

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-600">
                  Points Used
                </span>

                <span className="flex items-center gap-2 font-semibold text-amber-600">

                  <Star
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />

                  {redeemRewardPoints
                    ? rewardDiscount
                    : 0}

                </span>

              </div>

              {/* Discount */}

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-600">
                  Discount
                </span>

                <span
                  className={`font-semibold ${
                    rewardDiscount > 0
                      ? "text-green-600"
                      : "text-slate-400"
                  }`}
                >
                  {rewardDiscount > 0
                    ? `- ${formatCurrency(
                        rewardDiscount
                      )}`
                    : formatCurrency(0)}
                </span>

              </div>

            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">

              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  redeemRewardPoints
                    ? "text-green-600"
                    : "text-slate-500"
                }`}
              >

                <CheckCircle2 size={16} />

                {redeemRewardPoints
                  ? "Reward points will be redeemed."
                  : "Reward points will not be redeemed."}

              </div>

            </div>

          </div>

        ) : (

          <div className="mt-4 rounded-xl bg-white/70 p-4 text-sm text-slate-500">
            This customer has no reward points available.
          </div>

        )}

        {/* Earned Points */}

        <div className="mt-5 flex items-center justify-between border-t border-amber-200 pt-4">

          <span className="text-sm font-medium text-slate-600">
            Reward Points You'll Earn
          </span>

          <span className="flex items-center gap-2 font-bold text-green-600">

            <Star
              size={17}
              className="fill-amber-400 text-amber-400"
            />

            {rewardEarned}

          </span>

        </div>

      </div>

      {/* =====================================================
          PAYMENT DETAILS
      ====================================================== */}

      <div className="border-t border-slate-100 px-6 py-6 sm:px-8">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <CreditCard
              size={21}
              className="text-blue-600"
            />
          </div>

          <div>

            <h3 className="font-bold text-slate-800">
              Payment Details
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Select how the customer will pay.
            </p>

          </div>

        </div>

        {/* Payment Method */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >

            <option value="Cash">
              Cash
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Card">
              Card
            </option>

            <option value="Net Banking">
              Net Banking
            </option>

          </select>

        </div>

        {/* Cash */}

        {paymentMethod === "Cash" && (

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Cash Received
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <div className="flex w-12 items-center justify-center bg-blue-50 text-blue-600">
                ₹
              </div>

              <input
                type="number"
                min="0"
                value={cashReceived}
                onChange={(e) =>
                  setCashReceived(
                    e.target.value
                  )
                }
                placeholder="Enter cash received"
                className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
              />

            </div>

            {/* Cash Information */}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Bill Amount
                </p>

                <p className="mt-1 text-xl font-bold text-blue-700">
                  {formatCurrency(
                    grandTotal
                  )}
                </p>

              </div>

              <div className="rounded-xl border border-green-100 bg-green-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                  Change to Return
                </p>

                <p className="mt-1 text-xl font-bold text-green-700">
                  {formatCurrency(
                    changeToReturn
                  )}
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div className="border-t border-slate-100 px-6 py-6 sm:px-8">

        <div className="grid gap-3 sm:grid-cols-2">

          {/* Clear */}

          <button
            type="button"
            onClick={onClearBill}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3.5 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <Trash2 size={18} />

            Clear Bill

          </button>

          {/* Generate */}

          <button
            type="button"
            onClick={onGenerateBill}
            disabled={
              saving ||
              !customer ||
              items.length === 0
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >

            <FileText size={18} />

            {saving
              ? "Generating..."
              : "Generate Bill"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default BillSummary;