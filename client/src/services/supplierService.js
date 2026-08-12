import api from "./axios";

// =======================================
// Get All Suppliers
// Supports:
// - Search by supplier name
// - Search by contact number
// - Pagination
// =======================================
export const getSuppliers = async (
  search = "",
  page = 1,
  limit = 10
) => {
  const response = await api.get("/suppliers", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data;
};

// =======================================
// Get Supplier By ID
// =======================================
export const getSupplierById = async (id) => {
  const response = await api.get(
    `/suppliers/${id}`
  );

  return response.data;
};

// =======================================
// Create Supplier
// =======================================
export const addSupplier = async (
  supplierData
) => {
  const response = await api.post(
    "/suppliers",
    supplierData
  );

  return response.data;
};

// =======================================
// Update Supplier
// =======================================
export const updateSupplier = async (
  id,
  supplierData
) => {
  const response = await api.put(
    `/suppliers/${id}`,
    supplierData
  );

  return response.data;
};

// =======================================
// Delete Supplier
// =======================================
export const deleteSupplier = async (id) => {
  const response = await api.delete(
    `/suppliers/${id}`
  );

  return response.data;
};

// =======================================
// Supplier Purchase History
// =======================================
export const getSupplierPurchaseHistory = async (
  id
) => {
  const response = await api.get(
    `/suppliers/${id}/history`
  );

  return response.data;
};