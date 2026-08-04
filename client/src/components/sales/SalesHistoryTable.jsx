import { useState } from "react";
import { Eye, Download, Printer } from "lucide-react";

import { generateInvoicePDF } from "../../utils/generateInvoicePDF";
import InvoiceModal from "./InvoiceModal";

const SalesHistoryTable = ({ sales }) => {
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openInvoice = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const closeInvoice = () => {
    setSelectedSale(null);
    setIsModalOpen(false);
  };

  const handlePrint = (sale) => {
    generateInvoicePDF(sale);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  if (sales.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-10 text-center">
        <p className="text-gray-500">No sales found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Invoice</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Medicines</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Created By</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">
                  {sale.invoiceNumber}
                </td>

                <td className="px-4 py-3">
                  {sale.customer?.customerName}
                </td>

                <td className="px-4 py-3">
                  {new Date(sale.saleDate).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {sale.medicines.length}
                </td>

                <td className="px-4 py-3 font-semibold text-green-600">
                  ₹{sale.totalAmount}
                </td>

                <td className="px-4 py-3">
                  {sale.createdBy?.name}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openInvoice(sale)}
                      className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                      title="View Invoice"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => generateInvoicePDF(sale)}
                      className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-200"
                      title="Download PDF"
                    >
                      <Download size={18} />
                    </button>

                    <button
                      onClick={() => handlePrint(sale)}
                      className="rounded-lg bg-purple-100 p-2 text-purple-600 transition hover:bg-purple-200"
                      title="Print Invoice"
                    >
                      <Printer size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceModal
        sale={selectedSale}
        isOpen={isModalOpen}
        onClose={closeInvoice}
      />
    </>
  );
};

export default SalesHistoryTable;