import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader, ArrowLeft, Printer, Download } from "lucide-react";

import { getSaleById } from "../../services/saleService";
import Invoice from "../../components/sales/Invoice";
import { generateInvoicePDF } from "../../utils/generateInvoicePDF";

const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const invoiceRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState(null);

  // ==========================
  // Fetch Invoice
  // ==========================

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);

        const response = await getSaleById(id);

        setSale(response.sale);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load invoice."
        );

        navigate("/sales");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id, navigate]);

  // ==========================
  // Print
  // ==========================

  const handlePrint = () => {
    window.print();
  };

  // ==========================
  // Download PDF
  // ==========================

  const handleDownload = () => {
    generateInvoicePDF(sale);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!sale) {
    return null;
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Invoice
          </h1>

          <p className="text-gray-500">
            View, Print and Download Invoice
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => navigate("/sales")}
            className="flex items-center gap-2 rounded-lg border px-5 py-2 font-medium hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
          >
            <Download size={18} />
            Download PDF
          </button>

        </div>

      </div>

      {/* Invoice */}

      <div ref={invoiceRef}>
        <Invoice sale={sale} />
      </div>

    </div>
  );
};

export default InvoicePage;