const Invoice = ({ sale }) => {
  if (!sale) return null;

  return (
    <div className="mx-auto max-w-4xl bg-white p-8">
      {/* Header */}
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
            Phone: +91 XXXXX XXXXX
          </p>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-bold">
            TAX INVOICE
          </h2>

          <p className="mt-3">
            <span className="font-semibold">
              Invoice:
            </span>{" "}
            {sale.invoiceNumber}
          </p>

          <p>
            <span className="font-semibold">
              Date:
            </span>{" "}
            {new Date(
              sale.saleDate
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Customer Details */}

      <div className="mb-8 rounded-lg border bg-gray-50 p-4">
        <h3 className="mb-3 text-lg font-semibold">
          Customer Details
        </h3>

        <div className="grid gap-2 md:grid-cols-2">
          <p>
            <span className="font-medium">
              Name:
            </span>{" "}
            {sale.customer?.customerName}
          </p>

          <p>
            <span className="font-medium">
              Contact:
            </span>{" "}
            {sale.customer?.contactNumber}
          </p>
        </div>
      </div>

      {/* Medicines */}

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

            <th className="border p-3 text-right">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {sale.medicines.map((item, index) => (
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

              <td className="border p-3 text-right">
                ₹
                {(
                  item.quantity *
                  item.sellingPrice
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}

      <div className="mb-10 flex justify-end">
        <div className="w-72 rounded-lg border bg-gray-50 p-5">
          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total</span>

            <span className="text-green-600">
              ₹
              {sale.totalAmount?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="border-t pt-6 text-center text-sm text-gray-500">
        <p>
          Thank you for choosing our
          Medical Shop.
        </p>

        <p>
          Get Well Soon!
        </p>
      </div>
    </div>
  );
};

export default Invoice;