import Medicine from "../models/medicineModel.js";
import Supplier from "../models/supplierModel.js";
import Customer from "../models/customerModel.js";
import Purchase from "../models/purchaseModel.js";
import Sale from "../models/saleModel.js";
import Inventory from "../models/inventoryModel.js";

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

  // Total Stock
  const totalStock = inventory.reduce(
    (sum, item) => sum + item.currentStock,
    0
  );

  // Low Stock Medicines
  const lowStockMedicines = inventory.filter(
    (item) => item.currentStock <= item.reorderLevel
  );

  // Expired Medicines
  const today = new Date();

  const expiredMedicines = await Medicine.find({
    expiryDate: {
      $lt: today,
    },
  }).select("medicineName expiryDate");

  return {
    totalMedicines,
    totalSuppliers,
    totalCustomers,
    totalPurchases,
    totalSales,
    totalStock,
    lowStockMedicines,
    expiredMedicines,
  };
};