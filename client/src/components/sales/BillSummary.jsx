import { Star } from "lucide-react";

const BillSummary = ({
  items,
  customer,
  paymentMethod,
  setPaymentMethod,
  cashReceived,
  setCashReceived,
}) => {
  // ==========================
  // Calculations
  // ==========================

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        item.sellingPrice,
    0
  );

  const gstAmount = items.reduce(
    (sum, item) =>
      sum +
      (item.quantity *
        item.sellingPrice *
        item.gst) /
        100,
    0
  );

  const rewardDiscount =
    customer?.rewardPoints || 0;

  const grandTotal =
    subtotal +
    gstAmount -
    rewardDiscount;

  const rewardEarned = Math.floor(
    grandTotal / 100
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Bill Summary
      </h2>

      {/* ==========================
          Bill Totals
      ========================== */}

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>

          <span className="font-medium">
            ₹
            {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST</span>

          <span className="font-medium">
            ₹
            {gstAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Reward Discount</span>

          <span>
            - ₹
            {rewardDiscount.toLocaleString()}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">
          <span>Grand Total</span>

          <span className="text-blue-600">
            ₹
            {grandTotal.toLocaleString()}
          </span>
        </div>

      </div>

      {/* ==========================
          Reward Points
      ========================== */}

      <div className="mt-8 rounded-xl bg-blue-50 p-5">

        <div className="mb-3 flex items-center justify-between">

          <span>
            Reward Points Used
          </span>

          <div className="flex items-center gap-2 font-semibold">

            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            {rewardDiscount}

          </div>

        </div>

        <div className="flex items-center justify-between">

          <span>
            Reward Points You'll Earn
          </span>

          <div className="flex items-center gap-2 font-semibold text-green-600">

            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            {rewardEarned}

          </div>

        </div>

      </div>

      {/* ==========================
          Payment Details
      ========================== */}

      <div className="mt-8 border-t pt-6">

        <h3 className="mb-4 text-lg font-semibold">
          Payment Details
        </h3>

        <label className="mb-2 block text-sm font-medium">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
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

        {paymentMethod === "Cash" && (

          <div className="mt-4">

            <label className="mb-2 block text-sm font-medium">
              Cash Received
            </label>

            <input
              type="number"
              min="0"
              value={cashReceived}
              onChange={(e) =>
                setCashReceived(e.target.value)
              }
              placeholder="Enter cash received"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />

          </div>

        )}

      </div>

    </div>
  );
};

export default BillSummary;