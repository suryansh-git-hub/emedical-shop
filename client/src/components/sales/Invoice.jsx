const Invoice = ({ sale }) => {
  if (!sale) return null;

  return (
    <div
      className="
        mx-auto
        max-w-5xl
        rounded-xl
        bg-white
        text-slate-800
        shadow-lg

        dark:bg-slate-900
        dark:text-slate-200
        dark:shadow-black/40
      "
    >

      {/* ================= Header ================= */}

      <div className="rounded-t-xl bg-blue-700 px-8 py-6 text-white">

        <div className="flex items-start justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              eMedi Pharmacy
            </h1>

            <p className="mt-1 text-blue-100">
              Medical Shop Management System
            </p>

            <p className="mt-4 text-sm">
              Lucknow, Uttar Pradesh
            </p>

            <p className="text-sm">
              +91 XXXXX XXXXX
            </p>

            <p className="text-sm">
              GSTIN : XXXXXXXX1234
            </p>

          </div>

          <div className="text-right">

            <h2 className="text-3xl font-bold">
              TAX INVOICE
            </h2>

            <div className="mt-5 rounded-lg bg-white/20 p-4">

              <p>
                <span className="font-semibold">
                  Invoice
                </span>

                {" : "}

                {sale.invoiceNumber}
              </p>

              <p className="mt-2">
                <span className="font-semibold">
                  Date
                </span>

                {" : "}

                {new Date(
                  sale.saleDate
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="p-8">

        {/* ================= Customer ================= */}

        <div
          className="
            mb-8
            rounded-xl
            border
            border-slate-200
            bg-gray-50
            p-6

            dark:border-slate-700
            dark:bg-slate-800
          "
        >

          <h3
            className="
              mb-5
              text-xl
              font-semibold
              text-slate-800

              dark:text-slate-100
            "
          >
            Customer Details
          </h3>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <p>
                <span className="font-semibold">
                  Name :
                </span>{" "}
                {sale.customer?.customerName}
              </p>

              <p className="mt-3">
                <span className="font-semibold">
                  Contact :
                </span>{" "}
                {sale.customer?.contactNumber}
              </p>

            </div>

            <div>

              <p>
                <span className="font-semibold">
                  Email :
                </span>{" "}
                {sale.customer?.email || "-"}
              </p>

              <p className="mt-3">
                <span className="font-semibold">
                  Address :
                </span>{" "}
                {sale.customer?.address || "-"}
              </p>

            </div>

          </div>

        </div>

        {/* ================= Medicines ================= */}

        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-200

            dark:border-slate-700
          "
        >

          <table className="w-full">

            <thead
              className="
                bg-blue-50

                dark:bg-slate-800
              "
            >

              <tr>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Medicine
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-center
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Qty
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-right
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Price
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-center
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  GST
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-right
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {sale.medicines.map(
                (item, index) => {

                  const subtotal =
                    item.quantity *
                    item.sellingPrice;

                  const gst =
                    (subtotal *
                      (item.gst || 0)) /
                    100;

                  return (

                    <tr
                      key={index}
                      className="
                        border-t
                        border-slate-200
                        even:bg-gray-50

                        dark:border-slate-700
                        dark:even:bg-slate-800/50
                      "
                    >

                      <td className="px-5 py-4">
                        {item.medicine
                          ?.medicineName}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {item.quantity}
                      </td>

                      <td className="px-5 py-4 text-right">
                        ₹
                        {item.sellingPrice.toFixed(
                          2
                        )}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {item.gst}%
                      </td>

                      <td
                        className="
                          px-5
                          py-4
                          text-right
                          font-semibold
                          text-slate-800

                          dark:text-slate-100
                        "
                      >
                        ₹
                        {(
                          subtotal +
                          gst
                        ).toFixed(2)}
                      </td>

                    </tr>

                  );
                }
              )}

            </tbody>

          </table>

        </div>

        {/* ================= Billing Summary ================= */}

        <div className="mt-8 flex justify-end">

          <div
            className="
              w-[430px]
              rounded-xl
              border
              border-slate-200
              bg-gray-50
              p-6

              dark:border-slate-700
              dark:bg-slate-800
            "
          >

            <h3
              className="
                mb-5
                text-lg
                font-semibold
                text-slate-800

                dark:text-slate-100
              "
            >
              Bill Summary
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>
                  ₹{sale.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST</span>

                <span>
                  ₹
                  {sale.gstAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-red-600">

                <span>
                  Discount
                </span>

                <span>
                  - ₹
                  {sale.discount.toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between text-orange-600">

                <span>
                  Reward Redeemed
                </span>

                <span>
                  - ₹
                  {sale.redeemedPoints.toFixed(
                    2
                  )}
                </span>

              </div>

              <hr
                className="
                  border-slate-200

                  dark:border-slate-600
                "
              />

              <div
                className="
                  flex
                  justify-between
                  text-2xl
                  font-bold
                  text-slate-900

                  dark:text-white
                "
              >

                <span>
                  Grand Total
                </span>

                <span className="text-green-600">
                  ₹
                  {sale.grandTotal.toFixed(2)}
                </span>

              </div>

              <hr
                className="
                  border-slate-200

                  dark:border-slate-600
                "
              />

              <div className="flex justify-between">

                <span>
                  Payment Method
                </span>

                <span
                  className="
                    font-semibold
                    text-slate-800

                    dark:text-slate-100
                  "
                >
                  {sale.paymentMethod}
                </span>

              </div>

              {sale.paymentMethod ===
                "Cash" && (
                <>

                  <div className="flex justify-between">

                    <span>
                      Cash Received
                    </span>

                    <span>
                      ₹
                      {sale.cashReceived.toFixed(
                        2
                      )}
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      font-semibold
                      text-blue-600
                    "
                  >

                    <span>
                      Change Returned
                    </span>

                    <span>
                      ₹
                      {sale.changeReturned.toFixed(
                        2
                      )}
                    </span>

                  </div>

                </>
              )}

              <hr
                className="
                  border-slate-200

                  dark:border-slate-600
                "
              />

              <div className="flex justify-between">

                <span>
                  Reward Earned
                </span>

                <span className="font-semibold text-green-600">
                  ⭐ {sale.earnedPoints}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Reward Balance
                </span>

                <span className="font-semibold text-yellow-600">
                  ⭐
                  {sale.customer
                    ?.rewardPoints}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ================= Notes ================= */}

        {sale.notes && (

          <div
            className="
              mt-8
              rounded-lg
              border
              border-yellow-200
              bg-yellow-50
              p-5

              dark:border-yellow-900
              dark:bg-yellow-950/40
            "
          >

            <h3
              className="
                mb-2
                font-semibold
                text-slate-800

                dark:text-yellow-100
              "
            >
              Notes
            </h3>

            <p
              className="
                text-slate-700

                dark:text-yellow-100/80
              "
            >
              {sale.notes}
            </p>

          </div>

        )}

      </div>

      {/* ================= Footer ================= */}

      <div
        className="
          rounded-b-xl
          border-t
          border-slate-200
          bg-gray-50
          px-8
          py-6
          text-center

          dark:border-slate-700
          dark:bg-slate-800
        "
      >

        <p
          className="
            font-medium
            text-slate-800

            dark:text-slate-100
          "
        >
          Thank you for choosing eMedi Pharmacy.
        </p>

        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
          Medicines once sold will not be taken back.
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Please preserve this invoice for future reference.
        </p>

        <p className="mt-4 font-semibold text-green-600">
          🎉 Get Well Soon!
        </p>

      </div>

    </div>
  );
};

export default Invoice;