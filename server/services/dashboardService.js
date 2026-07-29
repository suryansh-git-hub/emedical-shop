import Medicine from "../models/medicineModel.js";
import Supplier from "../models/supplierModel.js";
import Customer from "../models/customerModel.js";
import Purchase from "../models/purchaseModel.js";
import Sale from "../models/saleModel.js";
import Inventory from "../models/inventoryModel.js";
import {MESSAGES} from "../constants/messages.js";

export const getDashboardStatsService = async () => {
  const [
    totalMedicines,
    totalSuppliers,
    totalCustomers,
    totalPurchases,
    totalSales,
    inventory,
  ] = await Promise.all([
    Medicine.countDocuments(),
    Supplier.countDocuments(),
    Customer.countDocuments(),
    Purchase.countDocuments(),
    Sale.countDocuments(),
    Inventory.find().populate("medicine", "medicineName"),
  ]);

  // =========================
  // Total Stock
  // =========================
  const totalStock = inventory.reduce(
    (sum, item) => sum + item.currentStock,
    0
  );

  // =========================
  // Low Stock Medicines
  // =========================
  const lowStockMedicines = inventory.filter(
    (item) => item.currentStock <= item.reorderLevel
  );

  // =========================
  // Expired Medicines
  // =========================
  const today = new Date();

  const expiredMedicines = await Medicine.find({
    expiryDate: {
      $lt: today,
    },
  }).select("medicineName expiryDate");

  // =========================
  // Today's Sales
  // =========================
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const todaySales = await Sale.aggregate([
    {
      $match: {
        saleDate: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  // =========================
  // Monthly Revenue
  // =========================
  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const monthlyRevenue = await Sale.aggregate([
    {
      $match: {
        saleDate: {
          $gte: startOfMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  // =========================
  // Top Selling Medicines
  // =========================
  const topSellingMedicines = await Sale.aggregate([
    {
      $unwind: "$medicines",
    },
    {
      $group: {
        _id: "$medicines.medicine",
        quantitySold: {
          $sum: "$medicines.quantity",
        },
      },
    },
    {
      $sort: {
        quantitySold: -1,
      },
    },
    {
      $limit: 5,
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
        quantitySold: 1,
      },
    },
  ]);

  return {
    message: MESSAGES.DASHBOARD_FETCHED,

    totalMedicines,
    totalSuppliers,
    totalCustomers,
    totalPurchases,
    totalSales,

    totalStock,

    lowStockMedicines,

    expiredMedicines,

    todaySales:
      todaySales.length > 0 ? todaySales[0].totalSales : 0,

    monthlyRevenue:
      monthlyRevenue.length > 0
        ? monthlyRevenue[0].totalRevenue
        : 0,

    topSellingMedicines,
  };
};