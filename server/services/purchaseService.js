import Purchase from "../models/purchaseModel.js";
import Supplier from "../models/supplierModel.js";
import Medicine from "../models/medicineModel.js";
import { MESSAGES } from "../constants/messages.js";
import Inventory from "../models/inventoryModel.js";

// ==========================
// Create Purchase
// ==========================
export const createPurchaseService = async (data, userId) => {
  const { supplier, invoiceNumber, purchaseDate, medicines } = data;

  // Check if medicines array is provided
  if (!medicines || medicines.length === 0) {
    throw new Error("At least one medicine is required.");
  }

  // Check duplicate invoice
  const existingPurchase = await Purchase.findOne({ invoiceNumber });

  if (existingPurchase) {
    throw new Error(MESSAGES.PURCHASE_ALREADY_EXISTS);
  }

  // Check supplier
  const supplierData = await Supplier.findById(supplier);

  if (!supplierData) {
    throw new Error(MESSAGES.SUPPLIER_NOT_FOUND);
  }

  let totalAmount = 0;

// Validate medicines, calculate total & update inventory
for (const item of medicines) {
  const medicine = await Medicine.findById(item.medicine);

  if (!medicine) {
    throw new Error(MESSAGES.MEDICINE_NOT_FOUND);
  }

  totalAmount += item.quantity * item.purchasePrice;

  // Check inventory
  let inventory = await Inventory.findOne({
    medicine: item.medicine,
  });

  if (inventory) {
    // Increase stock
    inventory.currentStock += item.quantity;

    await inventory.save();
  } else {
    // Create inventory record
    await Inventory.create({
      medicine: item.medicine,
      currentStock: item.quantity,
      reorderLevel: 20,
    });
  }
}

  // Create Purchase
  const purchase = await Purchase.create({
    supplier,
    invoiceNumber,
    purchaseDate,
    medicines,
    totalAmount,
    createdBy: userId,
  });

  return {
    message: MESSAGES.PURCHASE_CREATED,
    purchase,
  };
};

// ==========================
// Get All Purchases
// ==========================
export const getAllPurchasesService = async () => {
  const purchases = await Purchase.find()
    .populate("supplier", "supplierName contactNumber")
    .populate("createdBy", "name email role")
    .populate("medicines.medicine", "medicineName company")
    .sort({ createdAt: -1 })
    .lean();

  return {
    message: MESSAGES.PURCHASES_FETCHED,
    purchases,
  };
};

// ==========================
// Get Purchase By ID
// ==========================
export const getPurchaseByIdService = async (id) => {
  const purchase = await Purchase.findById(id)
    .populate("supplier", "supplierName contactNumber")
    .populate("createdBy", "name email role")
    .populate("medicines.medicine", "medicineName company")
    .lean();

  if (!purchase) {
    throw new Error(MESSAGES.PURCHASE_NOT_FOUND);
  }

  return {
    message: MESSAGES.PURCHASE_FETCHED,
    purchase,
  };
};