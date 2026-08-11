import api from "./axios";

// =======================================
// Get All Inventory
// =======================================

export const getInventory = async (
  params = {}
) => {
  const response = await api.get(
    "/inventory",
    {
      params,
    }
  );

  return response.data;
};

// =======================================
// Get Low Stock Medicines
// =======================================

export const getLowStockMedicines =
  async (params = {}) => {
    const response =
      await api.get(
        "/inventory/low-stock",
        {
          params,
        }
      );

    return response.data;
  };

// =======================================
// Get Out Of Stock Medicines
// =======================================

export const getOutOfStockMedicines =
  async (params = {}) => {
    const response =
      await api.get(
        "/inventory/out-of-stock",
        {
          params,
        }
      );

    return response.data;
  };

// =======================================
// Get Near Expiry Medicines
// =======================================

export const getNearExpiryMedicines =
  async (params = {}) => {
    const response =
      await api.get(
        "/inventory/near-expiry",
        {
          params,
        }
      );

    return response.data;
  };

// =======================================
// Get Expired Medicines
// =======================================

export const getExpiredMedicines =
  async (params = {}) => {
    const response =
      await api.get(
        "/inventory/expired",
        {
          params,
        }
      );

    return response.data;
  };

// =======================================
// Stock Movement History
// =======================================

export const getStockHistory =
  async (medicineId) => {
    const response =
      await api.get(
        `/inventory/stock-history/${medicineId}`
      );

    return response.data;
  };