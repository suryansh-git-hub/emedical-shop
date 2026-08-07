import Sale from "../models/saleModel.js";
import Customer from "../models/customerModel.js";
import Medicine from "../models/medicineModel.js";
import Inventory from "../models/inventoryModel.js";
import { MESSAGES } from "../constants/messages.js";

// ==========================
// Create Sale
// ==========================
export const createSaleService = async (data, userId) => {
  const {
    customer,
    saleDate,
    medicines,
    discountType = "flat",
    discount = 0,
    redeemPoints = 0,
    paymentMethod = "Cash",
    cashReceived = 0,
    notes = "",
  } = data;

  // ==========================
  // Basic Validation
  // ==========================

  if (!medicines || medicines.length === 0) {
    throw new Error("At least one medicine is required.");
  }

  const customerExists = await Customer.findById(customer);

  if (!customerExists) {
    throw new Error(MESSAGES.CUSTOMER_NOT_FOUND);
  }

  // Validate Reward Points
  const availablePoints = customerExists.rewardPoints || 0;

  if (redeemPoints < 0) {
    throw new Error("Invalid reward points.");
  }

  if (redeemPoints > availablePoints) {
    throw new Error("Customer does not have enough reward points.");
  }

  // ==========================
  // Duplicate Medicines Check
  // ==========================

  const medicineIds = medicines.map((item) => item.medicine.toString());

  if (new Set(medicineIds).size !== medicineIds.length) {
    throw new Error("Duplicate medicines are not allowed.");
  }

  // ==========================
  // Generate Invoice Number
  // ==========================

  let invoiceNumber;

  const lastSale = await Sale.findOne()
    .sort({ createdAt: -1 })
    .select("invoiceNumber");

  if (lastSale && lastSale.invoiceNumber.startsWith("INV-")) {
    const lastNumber = parseInt(lastSale.invoiceNumber.split("-")[1], 10);
    invoiceNumber = `INV-${String(lastNumber + 1).padStart(5, "0")}`;
  } else {
    invoiceNumber = "INV-00001";
  }

  // ==========================
  // Billing Variables
  // ==========================

  let subtotal = 0;
  let gstAmount = 0;

  const inventoryUpdates = [];
  const saleMedicines = [];

  // ==========================
  // Validate Medicines
  // ==========================

  for (const item of medicines) {
    const medicine = await Medicine.findById(item.medicine).select(
      "medicineName sellingPrice gst"
    );

    if (!medicine) {
      throw new Error(MESSAGES.MEDICINE_NOT_FOUND);
    }

    const inventory = await Inventory.findOne({
      medicine: item.medicine,
    });

    if (!inventory) {
      throw new Error(MESSAGES.INVENTORY_NOT_FOUND);
    }

    if (inventory.currentStock < Number(item.quantity)) {
      throw new Error(`${medicine.medicineName} has insufficient stock.`);
    }

    const itemSubtotal = medicine.sellingPrice * Number(item.quantity);
    const itemGST = (itemSubtotal * medicine.gst) / 100;

    subtotal += itemSubtotal;
    gstAmount += itemGST;

    inventoryUpdates.push({
      inventory,
      quantity: Number(item.quantity),
    });

    saleMedicines.push({
      medicine: medicine._id,
      quantity: Number(item.quantity),
      sellingPrice: medicine.sellingPrice,
      gst: medicine.gst,
    });
  }

  // ==========================
  // Discount
  // ==========================

  let discountAmount = 0;

  if (discountType === "percentage") {
    discountAmount = ((subtotal + gstAmount) * Number(discount)) / 100;
  } else {
    discountAmount = Number(discount);
  }

  if (discountAmount < 0) {
    throw new Error("Invalid discount.");
  }

  if (discountAmount > subtotal + gstAmount) {
    throw new Error("Discount exceeds bill amount.");
  }

  // ==========================
  // Grand Total & Reward Points
  // ==========================

  const rewardDiscount = Number(redeemPoints);

  const grandTotal = Math.max(
    subtotal + gstAmount - discountAmount - rewardDiscount,
    0
  );

  const earnedPoints = Math.floor(grandTotal / 100);

  // ==========================
  // Payment Validation
  // ==========================

  let paymentStatus = "Paid";
  const validMethods = ["Cash", "UPI", "Card", "Net Banking"];

  if (!validMethods.includes(paymentMethod)) {
    throw new Error("Invalid payment method.");
  }

  let changeReturned = 0;

  if (paymentMethod === "Cash") {
    if (Number(cashReceived) < grandTotal) {
      throw new Error("Cash received is less than Grand Total.");
    }

    changeReturned = Number(cashReceived) - grandTotal;
  }

  // ==========================
  // Create Sale Document
  // ==========================

  const sale = await Sale.create({
    customer,
    invoiceNumber,
    saleDate,
    medicines: saleMedicines,
    subtotal,
    gstAmount,
    discountType,
    discount: discountAmount,
    redeemedPoints: Number(redeemPoints),
    earnedPoints,
    grandTotal,
    // Keeping for compatibility
    totalAmount: grandTotal,
    paymentMethod,
    paymentStatus,
    cashReceived: paymentMethod === "Cash" ? Number(cashReceived) : 0,
    changeReturned,
    notes,
    createdBy: userId,
  });

  // ==========================
  // Update Inventory
  // ==========================

  for (const item of inventoryUpdates) {
    item.inventory.currentStock -= item.quantity;
    await item.inventory.save();
  }

  // ==========================
  // Update Customer Reward Points
  // ==========================

  customerExists.rewardPoints =
    availablePoints - Number(redeemPoints) + earnedPoints;
  await customerExists.save();

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
    .populate("medicines.medicine", "medicineName genericName company")
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
    .populate("customer",  "customerName contactNumber email address rewardPoints")
    .populate("createdBy", "name email role")
    .populate(
      "medicines.medicine",
      "medicineName genericName company category unit"
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