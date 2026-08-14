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
 *
 * Search is optional.
 * ==========================
 */
export const getCustomers = async (search = "") => {
  const response = await api.get("/customers", {
    params: {
      search: search.trim(),
      page: 1,
      limit: 10,
    },
  });

  return response.data;
};

/**
 * ==========================
 * Get Medicines
 *
 * Search is optional.
 * ==========================
 */
export const getMedicines = async (search = "") => {
  const response = await api.get("/medicines", {
    params: {
      search: search.trim(),
      page: 1,
      limit: 10,
    },
  });

  return response.data;
};