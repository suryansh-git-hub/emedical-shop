import api from "./axios";

/*
==========================
Get All Inventory
==========================
*/

export const getInventory = async () => {
  const response = await api.get("/inventory");

  return response.data;
};

/*
==========================
Get Low Stock Medicines
==========================
*/

export const getLowStockMedicines = async () => {
  const response = await api.get("/inventory/low-stock");

  return response.data;
};

/*
==========================
Get Out Of Stock Medicines
==========================
*/

export const getOutOfStockMedicines = async () => {
  const response = await api.get("/inventory/out-of-stock");

  return response.data;
};

/*
==========================
Get Near Expiry Medicines
==========================
*/

export const getNearExpiryMedicines = async () => {
  const response = await api.get("/inventory/near-expiry");

  return response.data;
};

// Get expired medicine
export const getExpiredMedicines =
  async () => {
    const response = await api.get(
      "/inventory/expired"
    );

    return response.data;
  };

/*
==========================
Stock Movement History
==========================
*/

export const getStockHistory = async (medicineId) => {
  const response = await api.get(
    `/inventory/stock-history/${medicineId}`
  );

  return response.data;
};