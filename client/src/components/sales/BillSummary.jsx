import {
  Star,
  CreditCard,
  IndianRupee,
  Gift,
  CheckCircle2,
} from "lucide-react";

const BillSummary = ({
  items = [],
  customer,

  // Reward Points
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
  // Calculations
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
  // Reward Points
  // ==========================================

  const availableRewardPoints = Number(
    customer?.rewardPoints || 0
  );

  // Maximum discount cannot be greater
  // than the bill amount.
  const maximumRewardDiscount = Math.min(
    availableRewardPoints,
    subtotal + gstAmount
  );

  // Only apply reward discount when
  // user explicitly enables it.
  const rewardDiscount = redeemRewardPoints
    ? maximumRewardDiscount
    : 0;

  // ==========================================
  // Grand Total
  // ==========================================

  const grandTotal = Math.max(
    0,
    subtotal +
      gstAmount -
      rewardDiscount
  );

  // ==========================================
  // Reward Points Earned
  // ==========================================

  const rewardEarned = Math.floor(
    grandTotal / 100
  );

  // ==========================================
  // Cash Change
  // ==========================================

  const cashAmount = Number(
    cashReceived || 0
  );

  const change =
    paymentMethod === "Cash" &&
    cashAmount >= grandTotal
      ? cashAmount - grandTotal
      : 0;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-7 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
          <IndianRupee
            size={21}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Bill Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review the amount before generating the bill.
          </p>
        </div>

      </div>

      {/* ==========================================
          Bill Totals
      ========================================== */}

      <div className="space-y-4">

        {/* Subtotal */}

        <div className="flex items-center justify-between text-sm">

          <span className="text-slate-500">
            Subtotal
          </span>

          <span className="font-semibold text-slate-800">
            ₹
            {subtotal.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </span>

        </div>

        {/* GST */}

        <div className="flex items-center justify-between text-sm">

          <span className="text-slate-500">
            GST
          </span>

          <span className="font-semibold text-slate-800">
            ₹
            {gstAmount.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </span>

        </div>

        {/* Reward Discount */}

        <div className="flex items-center justify-between text-sm">

          <span className="text-slate-500">
            Reward Discount
          </span>

          <span
            className={
              rewardDiscount > 0
                ? "font-semibold text-green-600"
                : "font-medium text-slate-400"
            }
          >
            - ₹
            {rewardDiscount.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </span>

        </div>

      </div>

      {/* ==========================================
          Grand Total
      ========================================== */}

      <div className="my-6 border-t border-slate-200 pt-6">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              Grand Total
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              ₹
              {grandTotal.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <IndianRupee
              size={23}
              className="text-white"
            />
          </div>

        </div>

      </div>

      {/* ==========================================
          Reward Points Section
      ========================================== */}

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

        {/* Reward Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">

              <Gift
                size={19}
                className="text-amber-600"
              />

            </div>

            <div>

              <p className="font-semibold text-slate-800">
                Reward Points
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Available:{" "}
                <span className="font-bold text-amber-600">
                  {availableRewardPoints}
                </span>{" "}
                points
              </p>

            </div>

          </div>

          {/* ==========================================
              Toggle
          ========================================== */}

          <button
            type="button"
            disabled={
              availableRewardPoints <= 0 ||
              items.length === 0
            }
            onClick={() =>
              setRedeemRewardPoints(
                (previous) => !previous
              )
            }
            className={`
              relative
              h-7
              w-12
              shrink-0
              rounded-full
              transition
              ${
                redeemRewardPoints
                  ? "bg-amber-500"
                  : "bg-slate-300"
              }
              ${
                availableRewardPoints <= 0 ||
                items.length === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }
            `}
          >

            <span
              className={`
                absolute
                top-1
                h-5
                w-5
                rounded-full
                bg-white
                shadow
                transition-transform
                ${
                  redeemRewardPoints
                    ? "translate-x-6"
                    : "translate-x-1"
                }
              `}
            />

          </button>

        </div>

        {/* ==========================================
            Reward Status
        ========================================== */}

        {availableRewardPoints <= 0 ? (

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs text-slate-500">

            <Star
              size={14}
              className="text-amber-500"
            />

            This customer has no reward points.

          </div>

        ) : redeemRewardPoints ? (

          <div className="mt-4 rounded-xl bg-white p-4">

            <div className="flex items-center justify-between text-sm">

              <span className="text-slate-500">
                Points Used
              </span>

              <span className="flex items-center gap-1 font-bold text-amber-600">

                <Star
                  size={15}
                  className="fill-yellow-400 text-yellow-400"
                />

                {rewardDiscount}

              </span>

            </div>

            <div className="mt-3 flex items-center justify-between text-sm">

              <span className="text-slate-500">
                Discount
              </span>

              <span className="font-bold text-green-600">
                - ₹
                {rewardDiscount.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-green-600">

              <CheckCircle2 size={14} />

              Reward points will be redeemed.

            </div>

          </div>

        ) : (

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs text-slate-500">

            <CheckCircle2
              size={14}
              className="text-slate-400"
            />

            Reward points will not be used.

          </div>

        )}

        {/* Points Earned */}

        <div className="mt-4 flex items-center justify-between border-t border-amber-200 pt-4">

          <span className="text-sm text-slate-600">
            Reward Points You'll Earn
          </span>

          <span className="flex items-center gap-1 font-bold text-green-600">

            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />

            {rewardEarned}

          </span>

        </div>

      </div>

      {/* ==========================================
          Payment Details
      ========================================== */}

      <div className="mt-7 border-t border-slate-200 pt-7">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">

            <CreditCard
              size={19}
              className="text-blue-600"
            />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              Payment Details
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Select how the customer will pay.
            </p>

          </div>

        </div>

        {/* Payment Method */}

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
          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
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

        {/* Cash Received */}

        {paymentMethod === "Cash" && (

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Cash Received
            </label>

            <div className="relative">

              <IndianRupee
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                min="0"
                step="0.01"
                value={cashReceived}
                onChange={(e) =>
                  setCashReceived(
                    e.target.value
                  )
                }
                placeholder="Enter cash received"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

            {/* Insufficient Cash */}

            {cashAmount > 0 &&
              cashAmount < grandTotal && (

                <p className="mt-2 text-xs font-medium text-red-500">
                  Cash received is less than the bill amount.
                </p>

              )}

            {/* Change */}

            {cashAmount >=
              grandTotal &&
              cashAmount > 0 && (

                <div className="mt-3 flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">

                  <span className="text-sm text-green-700">
                    Change to return
                  </span>

                  <span className="font-bold text-green-700">
                    ₹
                    {change.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </span>

                </div>

              )}

          </div>

        )}

      </div>

      {/* ==========================================
          Actions
      ========================================== */}

      <div className="mt-7 grid gap-3 border-t border-slate-200 pt-7 sm:grid-cols-2">

        <button
          type="button"
          onClick={onClearBill}
          disabled={saving}
          className="rounded-xl border border-red-200 px-6 py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Bill
        </button>

        <button
          type="button"
          onClick={onGenerateBill}
          disabled={
            saving ||
            !customer ||
            items.length === 0
          }
          className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Generating..."
            : "Generate Bill"}
        </button>

      </div>

    </div>
  );
};

export default BillSummary;