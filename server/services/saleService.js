import Sale from "../models/saleModel.js";
import Customer from "../models/customerModel.js";
import Medicine from "../models/medicineModel.js";
import Inventory from "../models/inventoryModel.js";
import { MESSAGES } from "../constants/messages.js";

// ==========================
// Create Sale
// ==========================
export const createSaleService = async (data, userId) => {
  const { customer, invoiceNumber, saleDate, medicines } = data;

  // Check medicines array
  if (!medicines || medicines.length === 0) {
    throw new Error("At least one medicine is required.");
  }

  // Check duplicate invoice
  const existingSale = await Sale.findOne({ invoiceNumber });

  if (existingSale) {
    throw new Error(MESSAGES.SALE_ALREADY_EXISTS);
  }

  // Check customer
  const customerExists = await Customer.findById(customer);

  if (!customerExists) {
    throw new Error(MESSAGES.CUSTOMER_NOT_FOUND);
  }

  let totalAmount = 0;

  // Store validated inventory for later update
  const inventoryUpdates = [];

  // Validate medicines & stock
  for (const item of medicines) {
    const medicine = await Medicine.findById(item.medicine);

    if (!medicine) {
      throw new Error(MESSAGES.MEDICINE_NOT_FOUND);
    }

    const inventory = await Inventory.findOne({
      medicine: item.medicine,
    });

    if (!inventory) {
      throw new Error(MESSAGES.INVENTORY_NOT_FOUND);
    }

    if (inventory.currentStock < item.quantity) {
      throw new Error(MESSAGES.INSUFFICIENT_STOCK);
    }

    totalAmount += item.quantity * item.sellingPrice;

    inventoryUpdates.push({
      inventory,
      quantity: item.quantity,
    });
  }

  // Create Sale
  const sale = await Sale.create({
    customer,
    invoiceNumber,
    saleDate,
    medicines,
    totalAmount,
    createdBy: userId,
  });

  // Update Inventory
  for (const item of inventoryUpdates) {
    item.inventory.currentStock -= item.quantity;
    await item.inventory.save();
  }

  return {
    message: MESSAGES.SALE_CREATED,
    sale,
  };
};

// ==========================
// Get All Sales
// ==========================
export const getAllSalesService = async () => {
  const sales = await Sale.find()
    .populate("customer", "customerName contactNumber")
    .populate("createdBy", "name email role")
    .populate(
      "medicines.medicine",
      "medicineName genericName company"
    )
    .sort({ createdAt: -1 })
    .lean();

  return {
    message: MESSAGES.SALES_FETCHED,
    sales,
  };
};

// ==========================
// Get Sale By ID
// ==========================
export const getSaleByIdService = async (id) => {
  const sale = await Sale.findById(id)
    .populate("customer", "customerName contactNumber")
    .populate("createdBy", "name email role")
    .populate(
      "medicines.medicine",
      "medicineName genericName company"
    )
    .lean();

  if (!sale) {
    throw new Error(MESSAGES.SALE_NOT_FOUND);
  }

  return {
    message: MESSAGES.SALE_FETCHED,
    sale,
  };
};