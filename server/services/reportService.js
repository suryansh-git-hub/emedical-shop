import Sale from "../models/saleModel.js";
import Purchase from "../models/purchaseModel.js";
import Inventory from "../models/inventoryModel.js";
import Medicine from "../models/medicineModel.js";
import { MESSAGES } from "../constants/messages.js";

// ==========================
// Sales Report
// ==========================
export const getSalesReportService = async () => {
  const sales = await Sale.find()
    .populate("customer", "customerName contactNumber")
    .populate("createdBy", "name email")
    .populate("medicines.medicine", "medicineName company")
    .sort({ saleDate: -1 })
    .lean();

  return {
    message: MESSAGES.SALES_FETCHED,
    sales,
  };
};

// ==========================
// Purchase Report
// ==========================
export const getPurchaseReportService = async () => {
  const purchases = await Purchase.find()
    .populate("supplier", "supplierName contactNumber")
    .populate("createdBy", "name email")
    .populate("medicines.medicine", "medicineName company")
    .sort({ purchaseDate: -1 })
    .lean();

  return {
    message: MESSAGES.PURCHASES_FETCHED,
    purchases,
  };
};

// ==========================
// Inventory Report
// ==========================
export const getInventoryReportService = async () => {
  const inventory = await Inventory.find()
    .populate(
      "medicine",
      "medicineName genericName company category batchNumber expiryDate"
    )
    .sort({ currentStock: 1 })
    .lean();

  return {
    message: MESSAGES.INVENTORY_FETCHED,
    inventory,
  };
};

// ==========================
// Low Stock Report
// ==========================
export const getLowStockReportService = async () => {
  const inventory = await Inventory.find()
    .populate(
      "medicine",
      "medicineName genericName company category"
    )
    .lean();

  const lowStock = inventory.filter(
    (item) => item.currentStock <= item.reorderLevel
  );

  return {
    message: "Low stock medicines fetched successfully.",
    lowStock,
  };
};

// ==========================
// Expired Medicines Report
// ==========================
export const getExpiredMedicinesReportService = async () => {
  const today = new Date();

  const expiredMedicines = await Medicine.find({
    expiryDate: {
      $lt: today,
    },
  })
    .select(
      "medicineName genericName company batchNumber expiryDate"
    )
    .sort({ expiryDate: 1 })
    .lean();

  return {
    message: "Expired medicines fetched successfully.",
    expiredMedicines,
  };
};

// Today's Sales Report

export const getTodaySalesReportService = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const sales = await Sale.find({
    saleDate: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  })
    .populate("customer", "customerName")
    .populate("createdBy", "name email")
    .populate("medicines.medicine", "medicineName")
    .lean();

  const totalSalesAmount = sales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  return {
    message: MESSAGES.TODAY_SALES_FETCHED,
    totalSales: totalSalesAmount,
    totalInvoices: sales.length,
    sales,
  };
};

// =======================================
// Weekly Sales Report
// =======================================
export const getWeeklySalesReportService = async () => {
  const endDate = new Date();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  startDate.setHours(0, 0, 0, 0);

  const sales = await Sale.find({
    saleDate: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .populate("customer", "customerName")
    .populate("createdBy", "name email")
    .populate("medicines.medicine", "medicineName")
    .lean();

  const totalSales = sales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  return {
    message: MESSAGES.WEEKLY_SALES_FETCHED,
    totalSales,
    totalInvoices: sales.length,
    startDate,
    endDate,
    sales,
  };
};

// Monthly Sales Report

export const getMonthlySalesReportService = async () => {
  const today = new Date();

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const sales = await Sale.find({
    saleDate: {
      $gte: startOfMonth,
      $lte: today,
    },
  })
    .populate("customer", "customerName")
    .populate("createdBy", "name email")
    .populate("medicines.medicine", "medicineName")
    .lean();

  const totalSales = sales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  return {
    message: MESSAGES.MONTHLY_SALES_FETCHED,
    totalSales,
    totalInvoices: sales.length,
    startDate: startOfMonth,
    endDate: today,
    sales,
  };
};

// Profit Report

export const getProfitReportService = async () => {
  const sales = await Sale.find()
    .populate("medicines.medicine")
    .lean();

  let totalRevenue = 0;
  let totalCost = 0;
  let totalProfit = 0;

  const report = [];

  for (const sale of sales) {
    for (const item of sale.medicines) {
      const medicine = item.medicine;

      const quantity = item.quantity;

      const revenue = medicine.sellingPrice * quantity;

      const cost = medicine.purchasePrice * quantity;

      const profit = revenue - cost;

      totalRevenue += revenue;
      totalCost += cost;
      totalProfit += profit;

      report.push({
        invoiceNumber: sale.invoiceNumber,
        saleDate: sale.saleDate,
        medicineName: medicine.medicineName,
        quantity,
        purchasePrice: medicine.purchasePrice,
        sellingPrice: medicine.sellingPrice,
        revenue,
        cost,
        profit,
      });
    }
  }

  return {
    message: MESSAGES.PROFIT_REPORT_FETCHED,
    totalRevenue,
    totalCost,
    totalProfit,
    report,
  };
};

// Best Selling Medicines Report

export const getBestSellingMedicinesReportService = async () => {
  const bestSellingMedicines = await Sale.aggregate([
    {
      $unwind: "$medicines",
    },
    {
      $group: {
        _id: "$medicines.medicine",
        totalQuantitySold: {
          $sum: "$medicines.quantity",
        },
        totalRevenue: {
          $sum: {
            $multiply: [
              "$medicines.quantity",
              "$medicines.sellingPrice",
            ],
          },
        },
      },
    },
    {
      $sort: {
        totalQuantitySold: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "medicines",
        localField: "_id",
        foreignField: "_id",
        as: "medicine",
      },
    },
    {
      $unwind: "$medicine",
    },
    {
      $project: {
        _id: 0,
        medicineName: "$medicine.medicineName",
        company: "$medicine.company",
        category: "$medicine.category",
        totalQuantitySold: 1,
        totalRevenue: 1,
      },
    },
  ]);

  return {
    message: MESSAGES.BEST_SELLING_MEDICINES_FETCHED,
    bestSellingMedicines,
  };
};