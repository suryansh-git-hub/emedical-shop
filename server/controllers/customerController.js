import {
  createCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService,getCustomerPurchaseHistoryService
} from "../services/customerService.js";

// Create Customer
export const createCustomer = async (req, res) => {
  try {
    const result = await createCustomerService(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Get All Customers
export const getAllCustomers = async (req, res) => {
  try {
    const result = await getAllCustomersService();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Get Customer By ID
export const getCustomerById = async (req, res) => {
  try {
    const result = await getCustomerByIdService(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

// Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const result = await updateCustomerService(req.params.id, req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const result = await deleteCustomerService(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

// ==========================
// Customer Purchase History
// ==========================
export const getCustomerPurchaseHistory = async (
  req,
  res
) => {
  try {
    const result =
      await getCustomerPurchaseHistoryService(
        req.params.id
      );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};