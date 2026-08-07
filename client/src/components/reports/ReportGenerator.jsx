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
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-semibold">
        Report Generator
      </h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">

        {/* Report Type */}

        <div className="flex-1">

          <label className="mb-2 block text-sm font-medium">
            Report Type
          </label>

          <select
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value)
            }
            className="w-full rounded-lg border p-3"
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
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
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
            className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Export

            <ChevronDown size={18} />
          </button>

          {showExport && hasReport && (

            <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-lg border bg-white shadow-lg">

              <button
                onClick={
                  handleExportExcel
                }
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-100"
              >
                <FileSpreadsheet
                  size={18}
                />

                Export Excel
              </button>

              <button
                onClick={
                  handleExportPDF
                }
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-100"
              >
                <FileText
                  size={18}
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