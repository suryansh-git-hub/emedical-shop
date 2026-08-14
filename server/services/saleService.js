import Sale from "../models/saleModel.js";
import Customer from "../models/customerModel.js";
import Medicine from "../models/medicineModel.js";
import Inventory from "../models/inventoryModel.js";

import { MESSAGES } from "../constants/messages.js";

// ==========================
// Create Sale
// ==========================
export const createSaleService = async (
  data,
  userId
) => {
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

  if (
    !medicines ||
    !Array.isArray(medicines) ||
    medicines.length === 0
  ) {
    throw new Error(
      "At least one medicine is required."
    );
  }

  // ==========================
  // Check Customer
  // ==========================

  const customerExists =
    await Customer.findById(customer);

  if (!customerExists) {
    throw new Error(
      MESSAGES.CUSTOMER_NOT_FOUND
    );
  }

  // ==========================
  // Reward Points Validation
  // ==========================

  const availablePoints =
    Number(
      customerExists.rewardPoints || 0
    );

  const redeemPointsNumber =
    Number(redeemPoints);

  if (
    !Number.isInteger(
      redeemPointsNumber
    ) ||
    redeemPointsNumber < 0
  ) {
    throw new Error(
      "Invalid reward points."
    );
  }

  if (
    redeemPointsNumber >
    availablePoints
  ) {
    throw new Error(
      "Customer does not have enough reward points."
    );
  }

  // ==========================
  // Duplicate Medicines Check
  // ==========================

  const medicineIds =
    medicines.map(
      (item) =>
        item.medicine.toString()
    );

  if (
    new Set(medicineIds).size !==
    medicineIds.length
  ) {
    throw new Error(
      "Duplicate medicines are not allowed."
    );
  }

  // ==========================
  // Generate Invoice Number
  // ==========================

  let invoiceNumber;

  const lastSale =
    await Sale.findOne()
      .sort({
        createdAt: -1,
      })
      .select(
        "invoiceNumber"
      );

  if (
    lastSale &&
    lastSale.invoiceNumber &&
    lastSale.invoiceNumber.startsWith(
      "INV-"
    )
  ) {
    const lastNumber =
      parseInt(
        lastSale.invoiceNumber.split(
          "-"
        )[1],
        10
      );

    invoiceNumber =
      `INV-${String(
        lastNumber + 1
      ).padStart(5, "0")}`;
  } else {
    invoiceNumber =
      "INV-00001";
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
    const quantity =
      Number(item.quantity);

    // ==========================
    // Validate Quantity
    // ==========================

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      throw new Error(
        "Medicine quantity must be a positive whole number."
      );
    }

    // ==========================
    // Find Medicine
    // ==========================

    const medicine =
      await Medicine.findById(
        item.medicine
      ).select(
        "medicineName sellingPrice gst stock"
      );

    if (!medicine) {
      throw new Error(
        MESSAGES.MEDICINE_NOT_FOUND
      );
    }

    // ==========================
    // Find Inventory
    // ==========================

    const inventory =
      await Inventory.findOne({
        medicine:
          item.medicine,
      });

    if (!inventory) {
      throw new Error(
        MESSAGES.INVENTORY_NOT_FOUND
      );
    }

    // ==========================
    // Current Stock
    // ==========================

    const inventoryStock =
      Number(
        inventory.currentStock || 0
      );

    const medicineStock =
      Number(
        medicine.stock || 0
      );

    // ==========================
    // Stock Validation
    // ==========================

    if (
      inventoryStock <
      quantity
    ) {
      throw new Error(
        `${medicine.medicineName} has insufficient inventory stock.`
      );
    }

    if (
      medicineStock <
      quantity
    ) {
      throw new Error(
        `${medicine.medicineName} has insufficient medicine stock.`
      );
    }

    // ==========================
    // Calculate Item Amount
    // ==========================

    const sellingPrice =
      Number(
        medicine.sellingPrice || 0
      );

    const gst =
      Number(
        medicine.gst || 0
      );

    const itemSubtotal =
      sellingPrice *
      quantity;

    const itemGST =
      (itemSubtotal * gst) /
      100;

    subtotal +=
      itemSubtotal;

    gstAmount +=
      itemGST;

    // ==========================
    // Store Inventory Update
    // ==========================

    inventoryUpdates.push({
      inventory,
      medicine,
      quantity,
    });

    // ==========================
    // Store Sale Medicine
    // ==========================

    saleMedicines.push({
      medicine:
        medicine._id,

      quantity,

      sellingPrice,

      gst,
    });
  }

  // ==========================
  // Discount
  // ==========================

  const discountNumber =
    Number(discount);

  if (
    !Number.isFinite(
      discountNumber
    ) ||
    discountNumber < 0
  ) {
    throw new Error(
      "Invalid discount."
    );
  }

  let discountAmount = 0;

  if (
    discountType ===
    "percentage"
  ) {
    if (
      discountNumber > 100
    ) {
      throw new Error(
        "Percentage discount cannot exceed 100%."
      );
    }

    discountAmount =
      ((subtotal +
        gstAmount) *
        discountNumber) /
      100;
  } else if (
    discountType === "flat"
  ) {
    discountAmount =
      discountNumber;
  } else {
    throw new Error(
      "Invalid discount type."
    );
  }

  // ==========================
  // Discount Validation
  // ==========================

  if (
    discountAmount >
    subtotal + gstAmount
  ) {
    throw new Error(
      "Discount exceeds bill amount."
    );
  }

  // ==========================
  // Reward Discount
  // ==========================

  const rewardDiscount =
    redeemPointsNumber;

  // ==========================
  // Grand Total
  // ==========================

  const grandTotal =
    Math.max(
      subtotal +
        gstAmount -
        discountAmount -
        rewardDiscount,
      0
    );

  // ==========================
  // Earn Reward Points
  // ==========================

  const earnedPoints =
    Math.floor(
      grandTotal / 100
    );

  // ==========================
  // Payment Validation
  // ==========================

  const validMethods = [
    "Cash",
    "UPI",
    "Card",
    "Net Banking",
  ];

  if (
    !validMethods.includes(
      paymentMethod
    )
  ) {
    throw new Error(
      "Invalid payment method."
    );
  }

  const receivedCash =
    Number(
      cashReceived || 0
    );

  let changeReturned = 0;

  if (
    paymentMethod === "Cash"
  ) {
    if (
      !Number.isFinite(
        receivedCash
      ) ||
      receivedCash <
        grandTotal
    ) {
      throw new Error(
        "Cash received is less than Grand Total."
      );
    }

    changeReturned =
      receivedCash -
      grandTotal;
  }

  // ==========================
  // Create Sale
  // ==========================

  const sale =
    await Sale.create({
      customer,

      invoiceNumber,

      saleDate,

      medicines:
        saleMedicines,

      subtotal,

      gstAmount,

      discountType,

      discount:
        discountAmount,

      redeemedPoints:
        redeemPointsNumber,

      earnedPoints,

      grandTotal,

      // Compatibility
      totalAmount:
        grandTotal,

      paymentMethod,

      paymentStatus:
        "Paid",

      cashReceived:
        paymentMethod ===
        "Cash"
          ? receivedCash
          : 0,

      changeReturned,

      notes,

      createdBy:
        userId,
    });

  // ==========================
  // UPDATE STOCK
  //
  // Inventory.currentStock
  // Medicine.stock
  // ==========================

  for (
    const item of inventoryUpdates
  ) {
    const quantity =
      Number(
        item.quantity
      );

    // --------------------------
    // Update Inventory
    // --------------------------

    item.inventory.currentStock =
      Number(
        item.inventory
          .currentStock || 0
      ) - quantity;

    // --------------------------
    // Update Medicine
    // --------------------------

    item.medicine.stock =
      Number(
        item.medicine.stock || 0
      ) - quantity;

    // --------------------------
    // Save Both
    // --------------------------

    await item.inventory.save();

    await item.medicine.save();
  }

  // ==========================
  // Update Customer Reward Points
  // ==========================

  customerExists.rewardPoints =
    availablePoints -
    redeemPointsNumber +
    earnedPoints;

  await customerExists.save();

  // ==========================
  // Return
  // ==========================

  return {
    message:
      MESSAGES.SALE_CREATED,

    sale,
  };
};

// ==========================
// Get All Sales
// ==========================

export const getAllSalesService =
  async () => {
    const sales =
      await Sale.find()
        .populate(
          "customer",
          "customerName contactNumber"
        )
        .populate(
          "createdBy",
          "name email role"
        )
        .populate(
          "medicines.medicine",
          "medicineName genericName company"
        )
        .sort({
          createdAt: -1,
        })
        .lean();

    return {
      message:
        MESSAGES.SALES_FETCHED,

      sales,
    };
  };

// ==========================
// Get Sale By ID
// ==========================

export const getSaleByIdService =
  async (id) => {
    const sale =
      await Sale.findById(id)
        .populate(
          "customer",
          "customerName contactNumber email address rewardPoints"
        )
        .populate(
          "createdBy",
          "name email role"
        )
        .populate(
          "medicines.medicine",
          "medicineName genericName company category unit"
        )
        .lean();

    if (!sale) {
      throw new Error(
        MESSAGES.SALE_NOT_FOUND
      );
    }

    return {
      message:
        MESSAGES.SALE_FETCHED,

      sale,
    };
  };