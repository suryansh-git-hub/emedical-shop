import {
  createSupplierService,
  getAllSuppliersService,
  getSupplierByIdService,
  updateSupplierService,
  deleteSupplierService,
  getSupplierPurchaseHistoryService,
} from "../services/supplierService.js";

// ==========================
// Create Supplier
// ==========================
export const createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Suppliers
// ==========================
export const getAllSuppliers = async (req, res) => {
  try {
    const result = await getAllSuppliersService();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Supplier By ID
// ==========================
export const getSupplierById = async (req, res) => {
  try {
    const result = await getSupplierByIdService(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Supplier
// ==========================
export const updateSupplier = async (req, res) => {
  try {
    const result = await updateSupplierService(
      req.params.id,
      req.body
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Supplier
// ==========================
export const deleteSupplier = async (req, res) => {
  try {
    const result = await deleteSupplierService(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

// ==========================
// Supplier Purchase History
// ==========================
export const getSupplierPurchaseHistory = async (
  req,
  res
) => {
  console.log("========== SUPPLIER HISTORY ==========");
  console.log("Supplier ID:", req.params.id);

  try {
    const result =
      await getSupplierPurchaseHistoryService(
        req.params.id
      );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      message: error.message,
    });
  }
};