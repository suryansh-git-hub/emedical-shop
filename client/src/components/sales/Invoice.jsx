const Invoice = ({ sale }) => {
  if (!sale) return null;

  return (
    <div className="mx-auto max-w-5xl bg-white p-8">

      {/* ================= Header ================= */}

      <div className="mb-8 flex items-start justify-between border-b pb-6">

        <div>

          <h1 className="text-3xl font-bold text-blue-700">
            Medical Shop
          </h1>

          <p className="mt-1 text-gray-600">
            Medical Shop Management System
          </p>

          <p className="text-sm text-gray-500">
            Lucknow, Uttar Pradesh
          </p>

          <p className="text-sm text-gray-500">
            Phone : +91 XXXXX XXXXX
          </p>

          <p className="text-sm text-gray-500">
            GSTIN : XXXXXXXX1234
          </p>

        </div>

        <div className="text-right">

          <h2 className="text-3xl font-bold">
            TAX INVOICE
          </h2>

          <p className="mt-4">
            <span className="font-semibold">
              Invoice :
            </span>{" "}
            {sale.invoiceNumber}
          </p>

          <p>
            <span className="font-semibold">
              Date :
            </span>{" "}
            {new Date(
              sale.saleDate
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

      {/* ================= Customer ================= */}

      <div className="mb-8 rounded-lg border bg-gray-50 p-5">

        <h3 className="mb-4 text-xl font-semibold">
          Customer Details
        </h3>

        <div className="grid grid-cols-2 gap-5">

          <div>

            <p>

              <span className="font-semibold">
                Name :
              </span>{" "}

              {sale.customer?.customerName}

            </p>

            <p className="mt-2">

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

            <p className="mt-2">

              <span className="font-semibold">
                Address :
              </span>{" "}

              {sale.customer?.address || "-"}

            </p>

          </div>

        </div>

      </div>

      {/* ================= Medicines ================= */}

      <table className="mb-8 w-full border-collapse border">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3 text-left">
              Medicine
            </th>

            <th className="border p-3 text-center">
              Qty
            </th>

            <th className="border p-3 text-right">
              Price
            </th>

            <th className="border p-3 text-center">
              GST
            </th>

            <th className="border p-3 text-right">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {sale.medicines.map((item, index) => {

            const subtotal =
              item.quantity *
              item.sellingPrice;

            const gst =
              (subtotal *
                (item.gst || 0)) /
              100;

            return (

              <tr key={index}>

                <td className="border p-3">

                  {item.medicine?.medicineName}

                </td>

                <td className="border p-3 text-center">

                  {item.quantity}

                </td>

                <td className="border p-3 text-right">

                  ₹{item.sellingPrice}

                </td>

                <td className="border p-3 text-center">

                  {item.gst || 0}%

                </td>

                <td className="border p-3 text-right">

                  ₹
                  {(subtotal + gst).toFixed(2)}

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

      {/* ================= Billing Summary ================= */}

      <div className="mb-10 flex justify-end">

        <div className="w-[420px] rounded-lg border bg-gray-50 p-6">

          <div className="space-y-3">

            <div className="flex justify-between">

              <span>Subtotal</span>

              <span>
                ₹
              {(sale.subtotal ?? 0).toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span>GST</span>

              <span>
                ₹
                {(sale.gstAmount ?? 0).toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Discount</span>

              <span className="text-red-600">

                - ₹
               {(sale.discount ?? 0).toFixed(2)}

              </span>

            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">

              <span>Grand Total</span>

              <span className="text-green-600">

                ₹
               {(sale.grandTotal ?? 0).toFixed(2)}

              </span>

            </div>

            <hr />

            <div className="flex justify-between">

              <span>Payment Method</span>

              <span>

                {sale.paymentMethod}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Cash Received</span>

              <span>

                ₹
               {(sale.cashReceived ?? 0).toFixed(2)}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Change Returned</span>

              <span className="font-semibold text-blue-600">

                ₹
             {(sale.changeReturned ?? 0).toFixed(2)}

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Notes ================= */}

      {sale.notes && (

        <div className="mb-8 rounded-lg border bg-yellow-50 p-4">

          <h3 className="mb-2 font-semibold">
            Notes
          </h3>

          <p>{sale.notes}</p>

        </div>

      )}

      {/* ================= Footer ================= */}

      <div className="border-t pt-6 text-center text-sm text-gray-500">

        <p>
          Thank you for choosing our Medical Shop.
        </p>

        <p className="mt-1">
          Medicines once sold will not be taken back.
        </p>

        <p className="mt-1">
          Please keep this invoice for future reference.
        </p>

        <p className="mt-3 font-medium">
          Get Well Soon!
        </p>

      </div>

    </div>
  );
};

export default Invoice;