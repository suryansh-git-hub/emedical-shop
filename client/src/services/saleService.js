import api from "./axios";

/**
 * ==========================
 * Get All Sales
 * ==========================
 */
export const getSales = async () => {
  const response = await api.get("/sales");

  return response.data;
};

/**
 * ==========================
 * Get Sale By ID
 * ==========================
 */
export const getSaleById = async (id) => {
  const response = await api.get(`/sales/${id}`);

  return response.data;
};

/**
 * ==========================
 * Create Sale
 * ==========================
 */
export const addSale = async (saleData) => {
  const response = await api.post("/sales", saleData);

  return response.data;
};

/**
 * ==========================
 * Get Customers
 * ==========================
 */
export const getCustomers = async () => {
  const response = await api.get("/customers");

  return response.data;
};

/**
 * ==========================
 * Get Medicines
 * ==========================
 */
export const getMedicines = async () => {
  const response = await api.get("/medicines");

  return response.data;
};