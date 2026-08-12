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
    throw new Error(
      MESSAGES.CUSTOMER_ALREADY_EXISTS
    );
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
  // Convert pagination values to numbers
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
  // Calculate documents to skip
  // =======================================

  const skip = (page - 1) * limit;

  // =======================================
  // Search Filter
  // Name OR Phone
  // =======================================

  const filter = {};

  if (search.trim()) {
    const searchValue = search.trim();

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
    ];
  }

  // =======================================
  // Count Total Customers
  // =======================================

  const totalCustomers =
    await Customer.countDocuments(filter);

  // =======================================
  // Get Paginated Customers
  // =======================================

  const customers =
    await Customer.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

  // =======================================
  // Calculate Total Pages
  // =======================================

  const totalPages =
    Math.ceil(
      totalCustomers / limit
    ) || 1;

  // =======================================
  // Return Result
  // =======================================

  return {
    message: MESSAGES.CUSTOMERS_FETCHED,

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
      throw new Error(
        MESSAGES.CUSTOMER_NOT_FOUND
      );
    }

    return {
      message: MESSAGES.CUSTOMER_FETCHED,
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
    throw new Error(
      MESSAGES.CUSTOMER_NOT_FOUND
    );
  }

  if (
    customerData.email &&
    customerData.email !== customer.email
  ) {
    const existingCustomer =
      await Customer.findOne({
        email: customerData.email,
      });

    if (existingCustomer) {
      throw new Error(
        MESSAGES.CUSTOMER_ALREADY_EXISTS
      );
    }
  }

  Object.assign(
    customer,
    customerData
  );

  await customer.save();

  return {
    message: MESSAGES.CUSTOMER_UPDATED,
    customer,
  };
};

// =======================================
// Delete Customer
// =======================================

export const deleteCustomerService = async (
  id
) => {
  const customer =
    await Customer.findById(id);

  if (!customer) {
    throw new Error(
      MESSAGES.CUSTOMER_NOT_FOUND
    );
  }

  await Customer.findByIdAndDelete(id);

  return {
    message: MESSAGES.CUSTOMER_DELETED,
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
      throw new Error(
        MESSAGES.CUSTOMER_NOT_FOUND
      );
    }

    const sales = await Sale.find({
      customer: customerId,
    })
      .populate(
        "medicines.medicine",
        "medicineName sellingPrice"
      )
      .sort({ saleDate: -1 })
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