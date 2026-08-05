import Medicine from "../models/medicineModel.js";
import Supplier from "../models/supplierModel.js";
import Customer from "../models/customerModel.js";
import Purchase from "../models/purchaseModel.js";
import Sale from "../models/saleModel.js";
import Inventory from "../models/inventoryModel.js";
import { MESSAGES } from "../constants/messages.js";

export const getDashboardStatsService = async () => {
  const today = new Date();

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

  const expiredMedicines = await Medicine.find({
    expiryDate: {
      $lt: today,
    },
  }).select("medicineName expiryDate company");

  // =========================
  // Expiring Medicines (Next 30 Days)
  // =========================

  const next30Days = new Date();

  next30Days.setDate(today.getDate() + 30);

  const expiringMedicines = await Medicine.find({
    expiryDate: {
      $gte: today,
      $lte: next30Days,
    },
  }).select(
    "medicineName expiryDate company category"
  );

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
  // Recent Sales
  // =========================

  const recentSales = await Sale.find()
    .populate("customer", "customerName")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  // =========================
  // Recent Purchases
  // =========================

  const recentPurchases = await Purchase.find()
    .populate("supplier", "supplierName")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

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

  // =========================
  // Monthly Sales Chart
  // =========================

  const monthlySales = await Sale.aggregate([
    {
      $group: {
        _id: {
          month: {
            $month: "$saleDate",
          },
        },
        totalSales: {
          $sum: "$totalAmount",
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  // =========================
  // Category-wise Sales
  // =========================

  const categorySales = await Sale.aggregate([
    {
      $unwind: "$medicines",
    },
    {
      $lookup: {
        from: "medicines",
        localField: "medicines.medicine",
        foreignField: "_id",
        as: "medicine",
      },
    },
    {
      $unwind: "$medicine",
    },
    {
      $group: {
        _id: "$medicine.category",
        totalSales: {
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
        totalSales: -1,
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

    expiringMedicines,

    todaySales:
      todaySales.length > 0
        ? todaySales[0].totalSales
        : 0,

    monthlyRevenue:
      monthlyRevenue.length > 0
        ? monthlyRevenue[0].totalRevenue
        : 0,

    recentSales,

    recentPurchases,

    topSellingMedicines,

    monthlySales,

    categorySales,
  };
};