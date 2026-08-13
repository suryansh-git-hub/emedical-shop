import { useState } from "react";
import {
  FileSpreadsheet,
  FileText,
  ChevronDown,
} from "lucide-react";

const ReportGenerator = ({
  onGenerate,
  onExportExcel,
  onExportPDF,
  hasReport,
}) => {
  const [reportType, setReportType] =
    useState("today");

  const [loading, setLoading] =
    useState(false);

  const [showExport, setShowExport] =
    useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      await onGenerate(reportType);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    onExportExcel();
    setShowExport(false);
  };

  const handleExportPDF = () => {
    onExportPDF();
    setShowExport(false);
  };

  return (
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-black/20
      "
    >

      <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Report Generator
      </h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">

        {/* Report Type */}

        <div className="flex-1">

          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Report Type
          </label>

          <select
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              p-3
              text-sm
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
              dark:focus:ring-blue-500/10
            "
          >
            <option value="today">
              Today's Sales
            </option>

            <option value="weekly">
              Weekly Sales
            </option>

            <option value="monthly">
              Monthly Sales
            </option>

            <option value="yearly">
              Yearly Sales
            </option>
          </select>

        </div>

        {/* Generate */}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-blue-700
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:bg-slate-400
            dark:disabled:bg-slate-700
          "
        >
          {loading
            ? "Generating..."
            : "Generate Report"}
        </button>

        {/* Export */}

        <div className="relative">

          <button
            disabled={!hasReport}
            onClick={() =>
              setShowExport(
                !showExport
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-green-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-green-700
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:bg-slate-400
              dark:disabled:bg-slate-700
            "
          >
            Export

            <ChevronDown size={18} />
          </button>

          {showExport && hasReport && (

            <div
              className="
                absolute
                right-0
                z-20
                mt-2
                w-52
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-xl
                dark:border-slate-700
                dark:bg-slate-800
                dark:shadow-black/40
              "
            >

              <button
                onClick={
                  handleExportExcel
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                "
              >
                <FileSpreadsheet
                  size={18}
                  className="text-green-600"
                />

                Export Excel
              </button>

              <button
                onClick={
                  handleExportPDF
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                "
              >
                <FileText
                  size={18}
                  className="text-red-500"
                />

                Export PDF
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ReportGenerator;