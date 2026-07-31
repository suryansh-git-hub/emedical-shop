import api from "./axios";

/**
 * Get All Suppliers
 */
export const getSuppliers = async () => {
  const response = await api.get("/suppliers");
  return response.data;
};

/**
 * Get Supplier By ID
 */
export const getSupplierById = async (id) => {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
};

/**
 * Create Supplier
 */
export const addSupplier = async (supplierData) => {
  const response = await api.post("/suppliers", supplierData);
  return response.data;
};

/**
 * Update Supplier
 */
export const updateSupplier = async (id, supplierData) => {
  const response = await api.put(`/suppliers/${id}`, supplierData);
  return response.data;
};

/**
 * Delete Supplier
 */
export const deleteSupplier = async (id) => {
  const response = await api.delete(`/suppliers/${id}`);
  return response.data;
};