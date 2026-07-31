import api from "./axios";

// ===============================
// Get All Medicines
// ===============================
export const getMedicines = async ({
  search = "",
  category = "",
  company = "",
  expiry = "",
  sortBy = "createdAt",
  order = "desc",
  page = 1,
  limit = 10,
} = {}) => {
  const response = await api.get("/medicines", {
    params: {
      search,
      category,
      company,
      expiry,
      sortBy,
      order,
      page,
      limit,
    },
  });

  return response.data;
};

// ===============================
// Add Medicine
// ===============================
export const addMedicine = async (formData) => {
  const response = await api.post(
    "/medicines",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ===============================
// Update Medicine
// ===============================
export const updateMedicine = async (id, formData) => {
  const response = await api.put(
    `/medicines/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ===============================
// Delete Medicine
// ===============================
export const deleteMedicine = async (id) => {
  const response = await api.delete(`/medicines/${id}`);

  return response.data;
};

// ===============================
// Get Medicine By ID
// ===============================
export const getMedicineById = async (id) => {
  const response = await api.get(`/medicines/${id}`);

  return response.data;
};