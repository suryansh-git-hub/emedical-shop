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

  const maximumRewardDiscount = Math.min(
    availablePoints,
    Math.floor(subtotal + gstAmount)
  );

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
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-[0_10px_40px_rgba(15,23,42,0.06)]

        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-black/20
      "
    >

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          border-b
          border-slate-100
          px-6
          py-6

          dark:border-slate-800

          sm:px-8
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-50

              dark:bg-blue-950/50
            "
          >
            <Receipt
              size={23}
              className="
                text-blue-600
                dark:text-blue-400
              "
            />
          </div>

          <div>

            <h2
              className="
                text-xl
                font-bold
                tracking-tight
                text-slate-900

                dark:text-slate-100

                sm:text-2xl
              "
            >
              Bill Summary
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              Review the amount before generating the bill.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          BILL BREAKDOWN
      ====================================================== */}

      <div className="px-6 pt-6 sm:px-8">

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50/50
            p-4

            dark:border-slate-800
            dark:bg-slate-950/50

            sm:p-5
          "
        >

          {/* Subtotal */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-dashed
              border-slate-200
              pb-4

              dark:border-slate-700
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-50

                  dark:bg-blue-950/50
                "
              >
                <Receipt
                  size={15}
                  className="
                    text-blue-600
                    dark:text-blue-400
                  "
                />
              </div>

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Subtotal
              </span>

            </div>

            <span
              className="
                text-sm
                font-semibold
                text-slate-800

                dark:text-slate-200
              "
            >
              {formatCurrency(subtotal)}
            </span>

          </div>

          {/* GST */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-dashed
              border-slate-200
              py-4

              dark:border-slate-700
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-purple-50

                  dark:bg-purple-950/50
                "
              >
                <Tag
                  size={15}
                  className="
                    text-purple-600
                    dark:text-purple-400
                  "
                />
              </div>

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-600

                  dark:text-slate-300
                "
              >
                GST
              </span>

            </div>

            <span
              className="
                text-sm
                font-semibold
                text-slate-800

                dark:text-slate-200
              "
            >
              {formatCurrency(gstAmount)}
            </span>

          </div>

          {/* Reward Discount */}

          <div className="flex items-center justify-between pt-4">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-green-50

                  dark:bg-green-950/50
                "
              >
                <Gift
                  size={15}
                  className="
                    text-green-600
                    dark:text-green-400
                  "
                />
              </div>

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Reward Discount
              </span>

            </div>

            <span
              className={`text-sm font-semibold ${
                rewardDiscount > 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-slate-400 dark:text-slate-500"
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

        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-blue-100
            bg-gradient-to-r
            from-blue-50
            to-indigo-50
            px-5
            py-5

            dark:border-blue-900/60
            dark:from-blue-950/50
            dark:to-indigo-950/40
          "
        >

          <div>

            <p
              className="
                text-sm
                font-semibold
                text-blue-700

                dark:text-blue-400
              "
            >
              Grand Total
            </p>

            <p
              className="
                mt-1
                text-3xl
                font-extrabold
                tracking-tight
                text-blue-700

                dark:text-blue-400

                sm:text-4xl
              "
            >
              {formatCurrency(grandTotal)}
            </p>

          </div>

          <div
            className="
              hidden
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              text-white
              shadow-sm

              sm:flex
            "
          >
            <Wallet size={23} />
          </div>

        </div>

      </div>

      {/* =====================================================
          REWARD POINTS
      ====================================================== */}

      <div
        className="
          mx-6
          mb-6
          rounded-2xl
          border
          border-amber-200
          bg-gradient-to-br
          from-amber-50
          to-yellow-50
          p-5

          dark:border-amber-900/60
          dark:from-amber-950/40
          dark:to-yellow-950/30

          sm:mx-8
        "
      >

        {/* Reward Header */}

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-amber-100

                dark:bg-amber-950/60
              "
            >
              <Gift
                size={21}
                className="
                  text-amber-600
                  dark:text-amber-400
                "
              />
            </div>

            <div>

              <h3
                className="
                  font-bold
                  text-slate-800

                  dark:text-slate-100
                "
              >
                Reward Points
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Available:{" "}
                <span
                  className="
                    font-bold
                    text-amber-600

                    dark:text-amber-400
                  "
                >
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
                : "bg-slate-300 dark:bg-slate-700"
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

          <div
            className="
              mt-5
              rounded-xl
              border
              border-slate-100
              bg-white
              p-4

              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div className="space-y-3">

              <div className="flex items-center justify-between">

                <span
                  className="
                    text-sm
                    text-slate-600

                    dark:text-slate-300
                  "
                >
                  Points Used
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-amber-600

                    dark:text-amber-400
                  "
                >

                  <Star
                    size={16}
                    className="
                      fill-amber-400
                      text-amber-400
                    "
                  />

                  {redeemRewardPoints
                    ? rewardDiscount
                    : 0}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span
                  className="
                    text-sm
                    text-slate-600

                    dark:text-slate-300
                  "
                >
                  Discount
                </span>

                <span
                  className={`font-semibold ${
                    rewardDiscount > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-400 dark:text-slate-500"
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

            <div
              className="
                mt-4
                border-t
                border-slate-100
                pt-3

                dark:border-slate-800
              "
            >

              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  redeemRewardPoints
                    ? "text-green-600 dark:text-green-400"
                    : "text-slate-500 dark:text-slate-400"
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

          <div
            className="
              mt-4
              rounded-xl
              bg-white/70
              p-4
              text-sm
              text-slate-500

              dark:bg-slate-900/50
              dark:text-slate-400
            "
          >
            This customer has no reward points available.
          </div>

        )}

        {/* Earned Points */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-amber-200
            pt-4

            dark:border-amber-900/60
          "
        >

          <span
            className="
              text-sm
              font-medium
              text-slate-600

              dark:text-slate-300
            "
          >
            Reward Points You'll Earn
          </span>

          <span
            className="
              flex
              items-center
              gap-2
              font-bold
              text-green-600

              dark:text-green-400
            "
          >

            <Star
              size={17}
              className="
                fill-amber-400
                text-amber-400
              "
            />

            {rewardEarned}

          </span>

        </div>

      </div>

      {/* =====================================================
          PAYMENT DETAILS
      ====================================================== */}

      <div
        className="
          border-t
          border-slate-100
          px-6
          py-6

          dark:border-slate-800

          sm:px-8
        "
      >

        <div className="mb-5 flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-blue-50

              dark:bg-blue-950/50
            "
          >
            <CreditCard
              size={21}
              className="
                text-blue-600
                dark:text-blue-400
              "
            />
          </div>

          <div>

            <h3
              className="
                font-bold
                text-slate-800

                dark:text-slate-100
              "
            >
              Payment Details
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              Select how the customer will pay.
            </p>

          </div>

        </div>

        {/* Payment Method */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700

              dark:text-slate-300
            "
          >
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              font-medium
              text-slate-700
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
              dark:focus:border-blue-500
              dark:focus:ring-blue-950
            "
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

            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700

                dark:text-slate-300
              "
            >
              Cash Received
            </label>

            <div
              className="
                flex
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white

                focus-within:border-blue-500
                focus-within:ring-4
                focus-within:ring-blue-100

                dark:border-slate-700
                dark:bg-slate-800
                dark:focus-within:ring-blue-950
              "
            >

              <div
                className="
                  flex
                  w-12
                  items-center
                  justify-center
                  bg-blue-50
                  text-blue-600

                  dark:bg-blue-950/50
                  dark:text-blue-400
                "
              >
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
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400

                  dark:text-slate-200
                  dark:placeholder:text-slate-500
                "
              />

            </div>

            {/* Cash Information */}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">

              <div
                className="
                  rounded-xl
                  border
                  border-blue-100
                  bg-blue-50
                  p-4

                  dark:border-blue-900/60
                  dark:bg-blue-950/40
                "
              >

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-blue-600

                    dark:text-blue-400
                  "
                >
                  Bill Amount
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-blue-700

                    dark:text-blue-400
                  "
                >
                  {formatCurrency(
                    grandTotal
                  )}
                </p>

              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-green-100
                  bg-green-50
                  p-4

                  dark:border-green-900/60
                  dark:bg-green-950/40
                "
              >

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-green-600

                    dark:text-green-400
                  "
                >
                  Change to Return
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-green-700

                    dark:text-green-400
                  "
                >
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

      <div
        className="
          border-t
          border-slate-100
          px-6
          py-6

          dark:border-slate-800

          sm:px-8
        "
      >

        <div className="grid gap-3 sm:grid-cols-2">

          {/* Clear */}

          <button
            type="button"
            onClick={onClearBill}
            disabled={saving}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-white
              px-5
              py-3.5
              font-semibold
              text-red-600
              transition
              hover:bg-red-50

              dark:border-red-900/60
              dark:bg-slate-900
              dark:text-red-400
              dark:hover:bg-red-950/40

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
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
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3.5
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
              hover:shadow-md

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
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