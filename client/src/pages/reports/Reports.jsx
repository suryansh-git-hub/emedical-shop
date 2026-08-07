import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportToPDF";
import ReportCard from "../../components/reports/ReportCard";
import ProfitCard from "../../components/reports/ProfitCard";

import PurchaseReportTable from "../../components/reports/PurchaseReportTable";
import InventoryReportTable from "../../components/reports/InventoryReportTable";
import BestSellingTable from "../../components/reports/BestSellingTable";
import ExpiredMedicinesTable from "../../components/reports/ExpiredMedicinesTable";


import ReportGenerator from "../../components/reports/ReportGenerator";
import GeneratedReportTable from "../../components/reports/GeneratedReportTable";

import {
  getSalesReport,
  getPurchaseReport,
  getInventoryReport,
  getExpiredMedicinesReport,
  getTodaySalesReport,
  getWeeklySalesReport,
  getMonthlySalesReport,
  getProfitReport,
  getBestSellingMedicinesReport,
} from "../../services/reportService";

const Reports = () => {
const [loading, setLoading] =
  useState(true);

// Existing reports

const [purchaseReport, setPurchaseReport] =
  useState([]);

const [inventoryReport, setInventoryReport] =
  useState([]);

const [
  expiredMedicinesReport,
  setExpiredMedicinesReport,
] = useState([]);

const [
  bestSellingReport,
  setBestSellingReport,
] = useState([]);

// Cards

const [todaySales, setTodaySales] =
  useState(0);

const [weeklySales, setWeeklySales] =
  useState(0);

const [monthlySales, setMonthlySales] =
  useState(0);

const [profit, setProfit] =
  useState(0);

// Generated Report

const [generatedReport, setGeneratedReport] =
  useState([]);

const [reportSummary, setReportSummary] =
  useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProfit: 0,
});

const [reportTitle, setReportTitle] =
  useState("");

const [hasGenerated, setHasGenerated] =
  useState(false);

 const loadReports = async () => {
  try {
    setLoading(true);

    const [
      purchases,
      inventory,
      expired,
      today,
      weekly,
      monthly,
      profitData,
      bestSelling,
    ] = await Promise.all([
      getPurchaseReport(),
      getInventoryReport(),
      getExpiredMedicinesReport(),
      getTodaySalesReport(),
      getWeeklySalesReport(),
      getMonthlySalesReport(),
      getProfitReport(),
      getBestSellingMedicinesReport(),
    ]);

    setPurchaseReport(
      purchases.purchases || []
    );

    setInventoryReport(
      inventory.inventory || []
    );

    setExpiredMedicinesReport(
      expired.expiredMedicines || []
    );

    setBestSellingReport(
      bestSelling.bestSellingMedicines ||
        []
    );

    setTodaySales(
      today.totalSales || 0
    );

    setWeeklySales(
      weekly.totalSales || 0
    );

    setMonthlySales(
      monthly.totalSales || 0
    );

    setProfit(
      profitData.totalProfit || 0
    );
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to load reports."
    );
  } finally {
    setLoading(false);
  }
};

const handleGenerateReport =
  async (type) => {
    try {
      const response =
        await getSalesReport(type);

      setGeneratedReport(
        response.report || []
      );

      setReportSummary(
        response.summary
      );

      switch (type) {
        case "today":
          setReportTitle(
            "Today's Sales Report"
          );
          break;

        case "weekly":
          setReportTitle(
            "Weekly Sales Report"
          );
          break;

        case "monthly":
          setReportTitle(
            "Monthly Sales Report"
          );
          break;

        case "yearly":
          setReportTitle(
            "Yearly Sales Report"
          );
          break;

        default:
          setReportTitle(
            "Sales Report"
          );
      }

      setHasGenerated(true);

      toast.success(
        "Report generated successfully."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate report."
      );
    }
  };

const handleExportExcel = () => {
  if (!generatedReport.length) {
    toast.error("Generate a report first.");
    return;
  }

  const excelData = generatedReport.map(
    (item) => ({
      Invoice: item.invoiceNumber,

      Customer: item.customer,

      Date: new Date(
        item.saleDate
      ).toLocaleDateString(),

      Medicines: item.totalMedicines,

      Revenue: `₹${Number(
        item.revenue
      ).toFixed(2)}`,

      Profit: `₹${Number(
        item.profit
      ).toFixed(2)}`,

      "Created By": item.createdBy,
    })
  );

  // Summary

  excelData.push({});

  excelData.push({
    Invoice: "Total Orders",
    Customer: reportSummary.totalOrders,
  });

  excelData.push({
    Invoice: "Total Revenue",
    Customer: `₹${Number(
      reportSummary.totalRevenue
    ).toFixed(2)}`,
  });

  excelData.push({
    Invoice: "Total Profit",
    Customer: `₹${Number(
      reportSummary.totalProfit
    ).toFixed(2)}`,
  });

  exportToExcel(
    excelData,
    "Sales Report",
    reportTitle
  );

  toast.success(
    "Excel exported successfully."
  );
};

const handleExportPDF = () => {
  if (!generatedReport.length) {
    toast.error("Generate a report first.");
    return;
  }

exportToPDF({
  title: reportTitle,

  fileName: reportTitle,

  headers: [
    "Invoice",
    "Customer",
    "Date",
    "Medicines",
    "Revenue",
    "Profit",
    "Created By",
  ],

  rows: generatedReport.map((item) => [
    item.invoiceNumber,
    item.customer,
    new Date(item.saleDate).toLocaleDateString(),
    item.totalMedicines,
    `₹${item.revenue}`,
    `₹${item.profit}`,
    item.createdBy,
  ]),

  summary: {
    "Total Orders": reportSummary.totalOrders,
    "Total Revenue": `₹${reportSummary.totalRevenue}`,
    "Total Profit": `₹${reportSummary.totalProfit}`,
  },
});

  toast.success(
    "PDF exported successfully."
  );
};

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

 return (
  <div className="space-y-8">

    {/* Heading */}

    <div>
      <h1 className="text-2xl font-bold">
        Reports & Analytics
      </h1>

      <p className="text-gray-500">
        View business insights and statistics
      </p>
    </div>

    {/* Summary Cards */}

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <ReportCard
        title="Today's Sales"
        value={`₹${todaySales.toLocaleString()}`}
      />

      <ReportCard
        title="Weekly Sales"
        value={`₹${weeklySales.toLocaleString()}`}
      />

      <ReportCard
        title="Monthly Sales"
        value={`₹${monthlySales.toLocaleString()}`}
      />

      <ProfitCard
        profit={profit}
      />

    </div>

    {/* Report Generator */}

    <ReportGenerator
      hasReport={hasGenerated}
      onGenerate={handleGenerateReport}
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />

    {/* Generated Report */}

    <GeneratedReportTable
      title={reportTitle}
      reports={generatedReport}
      summary={reportSummary}
    />

    {/* Purchase Report */}

    <PurchaseReportTable
      purchases={purchaseReport}
    />

    {/* Inventory Report */}

    <InventoryReportTable
      inventory={inventoryReport}
    />

  

    {/* Best Selling */}

    <BestSellingTable
      medicines={bestSellingReport}
    />

      {/* Bottom Reports */}

      <ExpiredMedicinesTable
        medicines={
          expiredMedicinesReport
        }
      />

  </div>
);
};

export default Reports;