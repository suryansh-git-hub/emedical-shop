import api from "./axios";

/*
==========================
Sales Report
==========================
*/

export const getSalesReport = async () => {
  const response = await api.get("/reports/sales");

  return response.data;
};

/*
==========================
Purchase Report
==========================
*/

export const getPurchaseReport = async () => {
  const response = await api.get("/reports/purchases");

  return response.data;
};

/*
==========================
Inventory Report
==========================
*/

export const getInventoryReport = async () => {
  const response = await api.get("/reports/inventory");

  return response.data;
};

/*
==========================
Low Stock Report
==========================
*/

export const getLowStockReport = async () => {
  const response = await api.get("/reports/low-stock");

  return response.data;
};

/*
==========================
Expired Medicines
==========================
*/

export const getExpiredMedicinesReport = async () => {
  const response = await api.get("/reports/expired-medicines");

  return response.data;
};

/*
==========================
Today's Sales
==========================
*/

export const getTodaySalesReport = async () => {
  const response = await api.get("/reports/sales/today");

  return response.data;
};

/*
==========================
Weekly Sales
==========================
*/

export const getWeeklySalesReport = async () => {
  const response = await api.get("/reports/sales/weekly");

  return response.data;
};

/*
==========================
Monthly Sales
==========================
*/

export const getMonthlySalesReport = async () => {
  const response = await api.get("/reports/sales/monthly");

  return response.data;
};

/*
==========================
Profit Report
==========================
*/

export const getProfitReport = async () => {
  const response = await api.get("/reports/profit");

  return response.data;
};

/*
==========================
Best Selling Medicines
==========================
*/

export const getBestSellingMedicinesReport = async () => {
  const response = await api.get("/reports/best-selling");

  return response.data;
};