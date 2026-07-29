import {
  getSalesReportService,
  getPurchaseReportService,
  getInventoryReportService,
  getLowStockReportService,
  getExpiredMedicinesReportService,getTodaySalesReportService,getWeeklySalesReportService,
  getMonthlySalesReportService,
  getProfitReportService,getBestSellingMedicinesReportService,
} from "../services/reportService.js";

// ==========================
// Sales Report
// ==========================
export const getSalesReport = async (req, res) => {
  try {
    const result = await getSalesReportService();

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
// Purchase Report
// ==========================
export const getPurchaseReport = async (req, res) => {
  try {
    const result = await getPurchaseReportService();

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
// Inventory Report
// ==========================
export const getInventoryReport = async (req, res) => {
  try {
    const result = await getInventoryReportService();

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
// Low Stock Report
// ==========================
export const getLowStockReport = async (req, res) => {
  try {
    const result = await getLowStockReportService();

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
// Expired Medicines Report
// ==========================
export const getExpiredMedicinesReport = async (req, res) => {
  try {
    const result = await getExpiredMedicinesReportService();

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
// Today's Sales Report

export const getTodaySalesReport = async (req, res) => {
  try {
    const result = await getTodaySalesReportService();

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

// Weekly Sales Report

export const getWeeklySalesReport = async (req, res) => {
  try {
    const result = await getWeeklySalesReportService();

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

// Monthly Sales Report

export const getMonthlySalesReport = async (req, res) => {
  try {
    const result = await getMonthlySalesReportService();

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

// Profit Report

export const getProfitReport = async (req, res) => {
  try {
    const result = await getProfitReportService();

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

// Best Selling Medicines Report

export const getBestSellingMedicinesReport = async (req, res) => {
  try {
    const result = await getBestSellingMedicinesReportService();

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