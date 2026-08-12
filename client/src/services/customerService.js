import api from "./axios";

// =======================================
// Get All Customers
// Search + Pagination
// =======================================

export const getCustomers = async (
  search = "",
  page = 1,
  limit = 10
) => {
  const response = await api.get(
    "/customers",
    {
      params: {
        search,
        page,
        limit,
      },
    }
  );

  return response.data;
};

// =======================================
// Get Customer By ID
// =======================================

export const getCustomerById = async (
  id
) => {
  const response = await api.get(
    `/customers/${id}`
  );

  return response.data;
};

// =======================================
// Get Customer Purchase History
// =======================================

export const getCustomerPurchaseHistory =
  async (id) => {
    const response = await api.get(
      `/customers/${id}/history`
    );

    return response.data;
  };

// =======================================
// Create Customer
// =======================================

export const addCustomer = async (
  customerData
) => {
  const response = await api.post(
    "/customers",
    customerData
  );

  return response.data;
};

// =======================================
// Update Customer
// =======================================

export const updateCustomer = async (
  id,
  customerData
) => {
  const response = await api.put(
    `/customers/${id}`,
    customerData
  );

  return response.data;
};

// =======================================
// Delete Customer
// =======================================

export const deleteCustomer = async (
  id
) => {
  const response = await api.delete(
    `/customers/${id}`
  );

  return response.data;
};