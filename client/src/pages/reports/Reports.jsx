import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

import BestSellingTable from "../../components/reports/BestSellingTable";
import ExpiredMedicinesTable from "../../components/reports/ExpiredMedicinesTable";
import InventoryReportTable from "../../components/reports/InventoryReportTable";
import LowStockTable from "../../components/dashboard/LowStockTable";
import ProfitCard from "../../components/reports/ProfitCard";
import PurchaseReportTable from "../../components/reports/PurchaseReportTable";
import ReportCard from "../../components/reports/ReportCard";
import SalesReportTable from "../../components/reports/SalesReportTable";

import {
  getSalesReport,
  getPurchaseReport,
  getInventoryReport,
  getLowStockReport,
  getExpiredMedicinesReport,
  getTodaySalesReport,
  getWeeklySalesReport,
  getMonthlySalesReport,
  getProfitReport,
  getBestSellingMedicinesReport,
} from "../../services/reportService";

const Reports = () => {
  const [loading, setLoading] = useState(true);

  const [salesReport, setSalesReport] = useState([]);
  const [purchaseReport, setPurchaseReport] = useState([]);
  const [inventoryReport, setInventoryReport] = useState([]);
  const [lowStockReport, setLowStockReport] = useState([]);
  const [expiredMedicinesReport, setExpiredMedicinesReport] = useState([]);
  const [bestSellingReport, setBestSellingReport] = useState([]);

  const [todaySales, setTodaySales] = useState(0);
  const [weeklySales, setWeeklySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [profit, setProfit] = useState(0);

  const loadReports = async () => {
    try {
      setLoading(true);

      const [
        sales,
        purchases,
        inventory,
        lowStock,
        expired,
        today,
        weekly,
        monthly,
        profitData,
        bestSelling,
      ] = await Promise.all([
        getSalesReport(),
        getPurchaseReport(),
        getInventoryReport(),
        getLowStockReport(),
        getExpiredMedicinesReport(),
        getTodaySalesReport(),
        getWeeklySalesReport(),
        getMonthlySalesReport(),
        getProfitReport(),
        getBestSellingMedicinesReport(),
      ]);

      setSalesReport(sales.sales || []);
      setPurchaseReport(purchases.purchases || []);
      setInventoryReport(inventory.inventory || []);
      setLowStockReport(lowStock.medicines || []);
      setExpiredMedicinesReport(expired.medicines || []);
      setBestSellingReport(bestSelling.medicines || []);

      setTodaySales(today.totalSales || 0);
      setWeeklySales(weekly.totalSales || 0);
      setMonthlySales(monthly.totalSales || 0);
      setProfit(profitData.totalProfit || 0);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load reports."
      );
    } finally {
      setLoading(false);
    }
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

        <ProfitCard profit={profit} />
      </div>

      {/* Sales Report */}

      <SalesReportTable sales={salesReport} />

      {/* Purchase Report */}

      <PurchaseReportTable purchases={purchaseReport} />

      {/* Inventory Report */}

      <InventoryReportTable inventory={inventoryReport} />

      {/* Bottom Grid */}

      <div className="grid gap-6 xl:grid-cols-2">
        <LowStockTable medicines={lowStockReport} />

        <ExpiredMedicinesTable
          medicines={expiredMedicinesReport}
        />
      </div>

      {/* Best Selling Medicines */}

      <BestSellingTable
        medicines={bestSellingReport}
      />
    </div>
  );
};

export default Reports;