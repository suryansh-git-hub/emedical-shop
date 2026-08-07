
import User from "../models/userModel.js";

import { comparePassword } from "../utils/comparePassword.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

import { MESSAGES } from "../constants/messages.js";

// =======================================
// Signup
// =======================================

export const registerUserService = async ({
  name,
  email,
  password,
  role,
}) => {
  if (!name || !email || !password) {
    const error = new Error(
      "Name, email and password are required."
    );
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email already exists.");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const userData = user.toObject();
  delete userData.password;

  return {
    message: "User registered successfully.",
    user: userData,
  };
};

// =======================================
// Login
// =======================================

export const loginUserService = async ({
  email,
  password,
}) => {
  if (!email || !password) {
    const error = new Error(
      "Email and password are required."
    );
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error(
      MESSAGES.INVALID_CREDENTIALS
    );
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("Account is inactive.");
    error.statusCode = 403;
    throw error;
  }

  const isPasswordMatched =
    await comparePassword(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    const error = new Error(
      MESSAGES.INVALID_CREDENTIALS
    );
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  const userData = user.toObject();

  delete userData.password;

  return {
    message: MESSAGES.LOGIN_SUCCESS,
    token,
    user: userData,
  };
};

// =======================================
// Forgot Password (Simple)
// =======================================

export const forgotPasswordService = async ({
  email,
  newPassword,
}) => {
  // Validate input
  if (!email || !newPassword) {
    const error = new Error(
      "Email and new password are required."
    );
    error.statusCode = 400;
    throw error;
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  // Prevent using same password
  const isSamePassword = await comparePassword(
    newPassword,
    user.password
  );

  if (isSamePassword) {
    const error = new Error(
      "New password cannot be same as old password."
    );
    error.statusCode = 400;
    throw error;
  }

  // Hash new password
  user.password = await hashPassword(newPassword);

  await user.save();

  return {
    message: "Password updated successfully.",
  };
};
