import Supplier from "../models/supplierModel.js";
import Purchase from "../models/purchaseModel.js";
import { MESSAGES } from "../constants/messages.js";

// ==========================
// Create Supplier
// ==========================
export const createSupplierService = async (supplierData) => {
  const { email, gstNumber } = supplierData;

  const existingSupplier = await Supplier.findOne({
    $or: [{ email }, { gstNumber }],
  });

  if (existingSupplier) {
    throw new Error(MESSAGES.SUPPLIER_ALREADY_EXISTS);
  }

  const supplier = await Supplier.create(supplierData);

  return {
    message: MESSAGES.SUPPLIER_CREATED,
    supplier,
  };
};

// ==========================
// Get All Suppliers
// Search + Pagination
// ==========================
export const getAllSuppliersService = async ({
  search = "",
  page = 1,
  limit = 10,
}) => {
  // ==========================
  // Convert Pagination Values
  // ==========================

  page = Math.max(Number(page) || 1, 1);
  limit = Math.max(Number(limit) || 10, 1);

  const skip = (page - 1) * limit;

  // ==========================
  // Search Filter
  // ==========================

  const filter = {};

  if (search.trim()) {
    const searchValue = search.trim();

    filter.$or = [
      {
        supplierName: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        contactNumber: {
          $regex: searchValue,
          $options: "i",
        },
      },
    ];
  }

  // ==========================
  // Total Suppliers
  // ==========================

  const totalSuppliers =
    await Supplier.countDocuments(filter);

  // ==========================
  // Paginated Suppliers
  // ==========================

  const suppliers = await Supplier.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // ==========================
  // Total Pages
  // ==========================

  const totalPages =
    Math.ceil(totalSuppliers / limit) || 1;

  return {
    message: MESSAGES.SUPPLIERS_FETCHED,
    suppliers,
    totalSuppliers,
    totalPages,
    currentPage: page,
    limit,
  };
};

// ==========================
// Get Supplier By ID
// ==========================
export const getSupplierByIdService = async (id) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error(MESSAGES.SUPPLIER_NOT_FOUND);
  }

  return {
    message: MESSAGES.SUPPLIER_FETCHED,
    supplier,
  };
};

// ==========================
// Update Supplier
// ==========================
export const updateSupplierService = async (
  id,
  supplierData
) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error(MESSAGES.SUPPLIER_NOT_FOUND);
  }

  // ==========================
  // Check Email
  // ==========================

  if (
    supplierData.email &&
    supplierData.email !== supplier.email
  ) {
    const existingEmail =
      await Supplier.findOne({
        email: supplierData.email,
      });

    if (existingEmail) {
      throw new Error(
        MESSAGES.SUPPLIER_ALREADY_EXISTS
      );
    }
  }

  // ==========================
  // Check GST
  // ==========================

  if (
    supplierData.gstNumber &&
    supplierData.gstNumber !== supplier.gstNumber
  ) {
    const existingGST =
      await Supplier.findOne({
        gstNumber: supplierData.gstNumber,
      });

    if (existingGST) {
      throw new Error(
        MESSAGES.SUPPLIER_ALREADY_EXISTS
      );
    }
  }

  Object.assign(
    supplier,
    supplierData
  );

  await supplier.save();

  return {
    message: MESSAGES.SUPPLIER_UPDATED,
    supplier,
  };
};

// ==========================
// Delete Supplier
// ==========================
export const deleteSupplierService = async (
  id
) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error(
      MESSAGES.SUPPLIER_NOT_FOUND
    );
  }

  await Supplier.findByIdAndDelete(id);

  return {
    message: MESSAGES.SUPPLIER_DELETED,
  };
};

// ==========================
// Supplier Purchase History
// ==========================
export const getSupplierPurchaseHistoryService =
  async (supplierId) => {
    const supplier =
      await Supplier.findById(supplierId);

    if (!supplier) {
      throw new Error(
        MESSAGES.SUPPLIER_NOT_FOUND
      );
    }

    const purchases = await Purchase.find({
      supplier: supplierId,
    })
      .populate(
        "medicines.medicine",
        "medicineName purchasePrice"
      )
      .sort({ purchaseDate: -1 })
      .lean();

    const totalPurchases =
      purchases.length;

    const totalSpent =
      purchases.reduce(
        (sum, purchase) =>
          sum + purchase.totalAmount,
        0
      );

    return {
      message:
        "Supplier purchase history fetched successfully.",
      supplier,
      totalPurchases,
      totalSpent,
      purchases,
    };
  };