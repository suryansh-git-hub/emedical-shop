import User from "../models/userModel.js";
import { comparePassword } from "../utils/comparePassword.js";
import { generateToken } from "../utils/generateToken.js";
import { MESSAGES } from "../constants/messages.js";

export const loginUserService = async ({ email, password }) => {
  // Check required fields
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.statusCode = 400;
    throw error;
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error(MESSAGES.INVALID_CREDENTIALS);
    error.statusCode = 401;
    throw error;
  }

  // Check if account is active
  if (!user.isActive) {
    const error = new Error("Account is inactive.");
    error.statusCode = 403;
    throw error;
  }

  // Compare password
  const isPasswordMatched = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    const error = new Error(MESSAGES.INVALID_CREDENTIALS);
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT
  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  // Remove password from response
  const userData = user.toObject();
  delete userData.password;

  return {
    message: MESSAGES.LOGIN_SUCCESS,
    token,
    user: userData,
  };
};