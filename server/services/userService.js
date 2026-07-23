import User from "../models/userModel.js";
import { hashPassword } from "../utils/hashPassword.js";
import { MESSAGES } from "../constants/messages.js";

export const createUserService = async (userData) => {
  const { name, email, password, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error(MESSAGES.USER_ALREADY_EXISTS);
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    message: MESSAGES.USER_CREATED,
    user: userResponse,
  };
};

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");

  return {
    message: "Users fetched successfully.",
    users,
  };
};

export const getUserByIdService = async (id) => {
  const user = await User.findById(id).select("-password");

  if(!user){
    const erro =new Error(MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  return{
    message:"User fetched successfully",
    user,
  }
};

export const updateUserService = async (id, userData) => {
  const { name, email, role } = userData;

  const user = await User.findById(id);

  if (!user) {
    const error = new Error(MESSAGES.USER_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Check if email is already used by another user
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error(MESSAGES.USER_ALREADY_EXISTS);
      error.statusCode = 409;
      throw error;
    }
  }

  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.role = role ?? user.role;

  await user.save();

  const updatedUser = user.toObject();
  delete updatedUser.password;

  return {
    message: "User updated successfully.",
    user: updatedUser,
  };
};

