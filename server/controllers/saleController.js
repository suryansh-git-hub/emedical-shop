import {
  createSaleService,
  getAllSalesService,
  getSaleByIdService,
} from "../services/saleService.js";

// ==========================
// Create Sale
// ==========================
export const createSale = async (req, res) => {
  try {
    const result = await createSaleService(req.body, req.user._id);

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
// Get All Sales
// ==========================
export const getAllSales = async (req, res) => {
  try {
    const result = await getAllSalesService();

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
// Get Sale By ID
// ==========================
export const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getSaleByIdService(id);

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