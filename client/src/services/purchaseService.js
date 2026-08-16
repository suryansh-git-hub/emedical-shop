import api from "./axios";

// =======================================
// Get All Purchases
// Supports:
// - Search by invoice number
// - Search by supplier name
// - Pagination
// =======================================

export const getPurchases = async (
  search = "",
  page = 1,
  limit = 10
) => {
  const response = await api.get("/purchases", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data;
};

// =======================================
// Get Purchase By ID
// =======================================

export const getPurchaseById = async (id) => {
  const response = await api.get(
    `/purchases/${id}`
  );

  return response.data;
};

// =======================================
// Create Purchase
// =======================================

export const addPurchase = async (
  purchaseData
) => {
  const response = await api.post(
    "/purchases",
    purchaseData
  );

  return response.data;
};

// =======================================
// Get All Suppliers
// Used for Purchase Form Dropdown
// =======================================

export const getSuppliers = async () => {
  const response = await api.get(
    "/suppliers"
  );

  return response.data;
};

// =======================================
// Get All Medicines
// Used for Purchase Form Dropdown
// =======================================

export const getMedicines = async () => {
  const response = await api.get(
    "/medicines",
    {
      params: {
        // The Purchase form needs every
        // medicine available to select from,
        // not just the first page (default
        // page size is 10).
        limit: 1000,
      },
    }
  );

  return response.data;
};