import { useRef } from "react";
import { X, Download, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

import Invoice from "./Invoice";
import { generateInvoicePDF } from "../../utils/generateInvoicePDF";

const InvoiceModal = ({
  sale,
  isOpen,
  onClose,
}) => {
  const invoiceRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: sale?.invoiceNumber || "Invoice",
  });

  if (!isOpen || !sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold">
              Invoice Preview
            </h2>

            <p className="text-sm text-gray-500">
              View, Download or Print Invoice
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Invoice */}

        <div className="flex-1 overflow-y-auto p-6">
          <div ref={invoiceRef}>
            <Invoice sale={sale} />
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={() =>
              generateInvoicePDF(sale)
            }
            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            <Download size={18} />
            Download PDF
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-5 py-2 hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;