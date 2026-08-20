import {
 Printer,
  ArrowLeft,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InvoiceActions = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mb-6 flex flex-wrap justify-end gap-3 print:hidden">

      {/* Billing */}

      <button
        onClick={() => navigate("/sales")}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          border
          border-slate-200
          bg-white
          px-5
          py-2.5
          font-medium
          text-slate-700
          transition
          hover:bg-gray-100

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-200
          dark:hover:bg-slate-800
        "
      >
        <ArrowLeft size={18} />
        Billing
      </button>

      {/* Print */}

       <button
        onClick={handlePrint}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-blue-600
          px-5
          py-2.5
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
      >
        <Printer size={18} />
        Print
      </button> 

      {/* Download */}

      <button
        onClick={handlePrint}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-green-600
          px-5
          py-2.5
          font-medium
          text-white
          transition
          hover:bg-green-700
        "
      >
        <Download size={18} />
        Download PDF
      </button>

    </div>
  );
};

export default InvoiceActions;