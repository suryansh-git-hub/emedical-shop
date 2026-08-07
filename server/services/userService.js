import User from "../models/userModel.js";
import { hashPassword } from "../utils/hashPassword.js";
import { MESSAGES } from "../constants/messages.js";

// =======================================
// Create User
// =======================================

export const createUserService = async (userData) => {
  const { name, email, password, role } = userData;

  if (!name || !email || !password) {
    const error = new Error(
      "Name, Email and Password are required."
    );
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error(
      MESSAGES.USER_ALREADY_EXISTS
    );
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

  const userResponse = user.toObject();

  delete userResponse.password;

  return {
    message: MESSAGES.USER_CREATED,
    user: userResponse,
  };
};

// =======================================
// Get All Users
// =======================================

export const getAllUsersService = async (
  search = ""
) => {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const users = await User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 });

  return {
    message: "Users fetched successfully.",
    users,
  };
};

// =======================================
// Get User By ID
// =======================================

export const getUserByIdService = async (
  id
) => {
  const user = await User.findById(id).select(
    "-password"
  );

  if (!user) {
    const error = new Error(
      MESSAGES.USER_NOT_FOUND
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message: "User fetched successfully.",
    user,
  };
};

// =======================================
// Update User
// =======================================

export const updateUserService = async (
  id,
  userData
) => {
  const { name, email, role } = userData;

  const user = await User.findById(id);

  if (!user) {
    const error = new Error(
      MESSAGES.USER_NOT_FOUND
    );

    error.statusCode = 404;

    throw error;
  }

  if (email && email !== user.email) {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      const error = new Error(
        MESSAGES.USER_ALREADY_EXISTS
      );

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

// =======================================
// Change User Status
// =======================================

export const changeUserStatusService =
  async (id, isActive) => {
    const user = await User.findById(id);

    if (!user) {
      const error = new Error(
        MESSAGES.USER_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    user.isActive = isActive;

    await user.save();

    const updatedUser = user.toObject();

    delete updatedUser.password;

    return {
      message: `User ${
        isActive ? "activated" : "deactivated"
      } successfully.`,
      user: updatedUser,
    };
  };