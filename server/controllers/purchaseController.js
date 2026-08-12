import {
  createPurchaseService,
  getAllPurchasesService,
  getPurchaseByIdService,
} from "../services/purchaseService.js";

// ==========================
// Create Purchase
// ==========================
export const createPurchase = async (
  req,
  res
) => {
  try {
    const result =
      await createPurchaseService(
        req.body,
        req.user.id
      );

    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Purchases
// Supports:
// - Search by invoice number
// - Search by supplier name
// - Pagination
// ==========================
export const getAllPurchases = async (
  req,
  res
) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
    } = req.query;

    const result =
      await getAllPurchasesService(
        search,
        page,
        limit
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Purchase By ID
// ==========================
export const getPurchaseById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const result =
      await getPurchaseByIdService(id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};