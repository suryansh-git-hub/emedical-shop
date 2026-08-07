const Invoice = ({ sale }) => {
  if (!sale) return null;

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white shadow-lg">

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

        <div className="mb-8 rounded-xl border bg-gray-50 p-6">

          <h3 className="mb-5 text-xl font-semibold">
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

        <div className="overflow-hidden rounded-xl border">

          <table className="w-full">

            <thead className="bg-blue-50">

              <tr>

                <th className="px-5 py-4 text-left">
                  Medicine
                </th>

                <th className="px-5 py-4 text-center">
                  Qty
                </th>

                <th className="px-5 py-4 text-right">
                  Price
                </th>

                <th className="px-5 py-4 text-center">
                  GST
                </th>

                <th className="px-5 py-4 text-right">
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
                      className="border-t even:bg-gray-50"
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

                      <td className="px-5 py-4 text-right font-semibold">

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

          <div className="w-[430px] rounded-xl border bg-gray-50 p-6">

            <h3 className="mb-5 text-lg font-semibold">
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

                <span>Discount</span>

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

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>
                  Grand Total
                </span>

                <span className="text-green-600">
                  ₹
                  {sale.grandTotal.toFixed(2)}
                </span>

              </div>

              <hr />

              <div className="flex justify-between">

                <span>
                  Payment Method
                </span>

                <span className="font-semibold">
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

                  <div className="flex justify-between text-blue-600 font-semibold">

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

              <hr />

              <div className="flex justify-between">

                <span>
                  Reward Earned
                </span>

                <span className="text-green-600 font-semibold">
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

        {sale.notes && (

          <div className="mt-8 rounded-lg border bg-yellow-50 p-5">

            <h3 className="mb-2 font-semibold">
              Notes
            </h3>

            <p>{sale.notes}</p>

          </div>

        )}

      </div>

      {/* ================= Footer ================= */}

      <div className="rounded-b-xl border-t bg-gray-50 px-8 py-6 text-center">

        <p className="font-medium">
          Thank you for choosing eMedi Pharmacy.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Medicines once sold will not be taken back.
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Please preserve this invoice for future reference.
        </p>

        <p className="mt-4 text-green-600 font-semibold">
          🎉 Get Well Soon!
        </p>

      </div>

    </div>
  );
};

export default Invoice;