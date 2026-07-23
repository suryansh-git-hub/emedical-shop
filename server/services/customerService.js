import Customer from "../models/customerModel.js";
import { MESSAGES } from "../constants/messages.js";

// Create Customer
export const createCustomerService = async (customerData) => {
  const { email } = customerData;

  const existingCustomer = await Customer.findOne({ email });

  if (existingCustomer) {
    throw new Error(MESSAGES.CUSTOMER_ALREADY_EXISTS);
  }

  const customer = await Customer.create(customerData);

  return {
    message: MESSAGES.CUSTOMER_CREATED,
    customer,
  };
};

// Get All Customers
export const getAllCustomersService = async () => {
  const customers = await Customer.find();

  return {
    message: MESSAGES.CUSTOMERS_FETCHED,
    customers,
  };
};

// Get Customer By ID
export const getCustomerByIdService = async (id) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new Error(MESSAGES.CUSTOMER_NOT_FOUND);
  }

  return {
    message: MESSAGES.CUSTOMER_FETCHED,
    customer,
  };
};

// Update Customer
export const updateCustomerService = async (id, customerData) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new Error(MESSAGES.CUSTOMER_NOT_FOUND);
  }

  if (
    customerData.email &&
    customerData.email !== customer.email
  ) {
    const existingCustomer = await Customer.findOne({
      email: customerData.email,
    });

    if (existingCustomer) {
      throw new Error(MESSAGES.CUSTOMER_ALREADY_EXISTS);
    }
  }

  Object.assign(customer, customerData);

  await customer.save();

  return {
    message: MESSAGES.CUSTOMER_UPDATED,
    customer,
  };
};

// Delete Customer
export const deleteCustomerService = async (id) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new Error(MESSAGES.CUSTOMER_NOT_FOUND);
  }

  await Customer.findByIdAndDelete(id);

  return {
    message: MESSAGES.CUSTOMER_DELETED,
  };
};