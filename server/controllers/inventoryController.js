import {
  getAllInventoryService,
  getInventoryByMedicineService,
} from "../services/inventoryService.js";

// ==========================
// Get All Inventory
// ==========================
export const getAllInventory = async (req, res) => {
  try {
    const result = await getAllInventoryService();

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Inventory By Medicine
// ==========================
export const getInventoryByMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const result = await getInventoryByMedicineService(medicineId);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};