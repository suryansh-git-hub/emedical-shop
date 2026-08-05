import { getDashboardStatsService } from "../services/dashboardService.js";

// ==========================
// Dashboard Statistics
// ==========================

export const getDashboardStats = async (req, res) => {
  try {
    const dashboard = await getDashboardStatsService();

    return res.status(200).json({
      success: true,
      message: dashboard.message,

      totalMedicines: dashboard.totalMedicines,
      totalSuppliers: dashboard.totalSuppliers,
      totalCustomers: dashboard.totalCustomers,
      totalPurchases: dashboard.totalPurchases,
      totalSales: dashboard.totalSales,

      totalStock: dashboard.totalStock,

      lowStockMedicines: dashboard.lowStockMedicines,
      expiredMedicines: dashboard.expiredMedicines,
      expiringMedicines: dashboard.expiringMedicines,

      todaySales: dashboard.todaySales,
      monthlyRevenue: dashboard.monthlyRevenue,

      recentSales: dashboard.recentSales,
      recentPurchases: dashboard.recentPurchases,

      topSellingMedicines: dashboard.topSellingMedicines,

      monthlySales: dashboard.monthlySales,
      categorySales: dashboard.categorySales,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};