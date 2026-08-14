import Customer from "../models/customerModel.js";
import { MESSAGES } from "../constants/messages.js";
import Sale from "../models/saleModel.js";

// =======================================
// Create Customer
// =======================================

export const createCustomerService = async (
  customerData
) => {
  const { email } = customerData;

  const existingCustomer =
    await Customer.findOne({ email });

  if (existingCustomer) {
    const error = new Error(
      MESSAGES.CUSTOMER_ALREADY_EXISTS
    );

    error.statusCode = 409;

    throw error;
  }

  const customer =
    await Customer.create(customerData);

  return {
    message: MESSAGES.CUSTOMER_CREATED,
    customer,
  };
};

// =======================================
// Get All Customers
// Search + Pagination
// =======================================

export const getAllCustomersService = async ({
  search = "",
  page = 1,
  limit = 10,
}) => {
  // =======================================
  // Convert pagination values
  // =======================================

  page = Math.max(
    Number(page) || 1,
    1
  );

  limit = Math.max(
    Number(limit) || 10,
    1
  );

  // =======================================
  // Calculate skip
  // =======================================

  const skip =
    (page - 1) * limit;

  // =======================================
  // Search Filter
  // Name + Phone + Email
  // =======================================

  const filter = {};

  if (search.trim()) {
    const searchValue =
      search.trim();

    filter.$or = [
      {
        customerName: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        contactNumber: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        email: {
          $regex: searchValue,
          $options: "i",
        },
      },
    ];
  }

  // =======================================
  // Count Matching Customers
  // =======================================

  const totalCustomers =
    await Customer.countDocuments(
      filter
    );

  // =======================================
  // Fetch Matching Customers
  // =======================================

  const customers =
    await Customer.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

  // =======================================
  // Calculate Total Pages
  // =======================================

  const totalPages =
    Math.ceil(
      totalCustomers / limit
    ) || 1;

  // =======================================
  // Return
  // =======================================

  return {
    message:
      MESSAGES.CUSTOMERS_FETCHED,

    customers,

    totalCustomers,

    totalPages,

    currentPage: page,

    limit,
  };
};

// =======================================
// Get Customer By ID
// =======================================

export const getCustomerByIdService =
  async (id) => {
    const customer =
      await Customer.findById(id);

    if (!customer) {
      const error = new Error(
        MESSAGES.CUSTOMER_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    return {
      message:
        MESSAGES.CUSTOMER_FETCHED,

      customer,
    };
  };

// =======================================
// Update Customer
// =======================================

export const updateCustomerService = async (
  id,
  customerData
) => {
  const customer =
    await Customer.findById(id);

  if (!customer) {
    const error = new Error(
      MESSAGES.CUSTOMER_NOT_FOUND
    );

    error.statusCode = 404;

    throw error;
  }

  // =======================================
  // Check Duplicate Email
  // =======================================

  if (
    customerData.email &&
    customerData.email !==
      customer.email
  ) {
    const existingCustomer =
      await Customer.findOne({
        email: customerData.email,
      });

    if (existingCustomer) {
      const error = new Error(
        MESSAGES.CUSTOMER_ALREADY_EXISTS
      );

      error.statusCode = 409;

      throw error;
    }
  }

  // =======================================
  // Update
  // =======================================

  Object.assign(
    customer,
    customerData
  );

  await customer.save();

  return {
    message:
      MESSAGES.CUSTOMER_UPDATED,

    customer,
  };
};

// =======================================
// Delete Customer
// =======================================

export const deleteCustomerService =
  async (id) => {
    const customer =
      await Customer.findById(id);

    if (!customer) {
      const error = new Error(
        MESSAGES.CUSTOMER_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    await Customer.findByIdAndDelete(
      id
    );

    return {
      message:
        MESSAGES.CUSTOMER_DELETED,
    };
  };

// =======================================
// Customer Purchase History
// =======================================

export const getCustomerPurchaseHistoryService =
  async (customerId) => {
    const customer =
      await Customer.findById(
        customerId
      );

    if (!customer) {
      const error = new Error(
        MESSAGES.CUSTOMER_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    const sales =
      await Sale.find({
        customer: customerId,
      })
        .populate(
          "medicines.medicine",
          "medicineName sellingPrice"
        )
        .sort({
          saleDate: -1,
        })
        .lean();

    const totalOrders =
      sales.length;

    const totalSpent =
      sales.reduce(
        (sum, sale) =>
          sum + sale.totalAmount,
        0
      );

    return {
      message:
        "Customer purchase history fetched successfully.",

      customer,

      totalOrders,

      totalSpent,

      sales,
    };
  };