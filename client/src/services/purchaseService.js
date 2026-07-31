import api from "./axios";

/**
 * ==========================
 * Get All Purchases
 * ==========================
 */
export const getPurchases = async () => {
  const response = await api.get("/purchases");

  return response.data;
};

/**
 * ==========================
 * Get Purchase By ID
 * ==========================
 */
export const getPurchaseById = async (id) => {
  const response = await api.get(`/purchases/${id}`);

  return response.data;
};

/**
 * ==========================
 * Create Purchase
 * ==========================
 */
export const addPurchase = async (purchaseData) => {
  const response = await api.post("/purchases", purchaseData);

  return response.data;
};

/**
 * ==========================
 * Get All Suppliers
 * (Dropdown)
 * ==========================
 */
export const getSuppliers = async () => {
  const response = await api.get("/suppliers");

  return response.data;
};

/**
 * ==========================
 * Get All Medicines
 * (Dropdown)
 * ==========================
 */
export const getMedicines = async () => {
  const response = await api.get("/medicines");

  return response.data;
};