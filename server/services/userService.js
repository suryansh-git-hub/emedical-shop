import User from "../models/userModel.js";
import { hashPassword } from "../utils/hashPassword.js";
import { MESSAGES } from "../constants/messages.js";

// =======================================
// Create User
// =======================================

export const createUserService = async (userData) => {
  const {
    name,
    email,
    password,
    role,
  } = userData;

  if (!name || !email || !password) {
    const error = new Error(
      "Name, Email and Password are required."
    );

    error.statusCode = 400;

    throw error;
  }

  // =======================================
  // Check Existing User
  // =======================================

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

  // =======================================
  // Hash Password
  // =======================================

  const hashedPassword =
    await hashPassword(password);

  // =======================================
  // Create User
  // =======================================

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // =======================================
  // Remove Password From Response
  // =======================================

  const userResponse = user.toObject();

  delete userResponse.password;

  return {
    message: MESSAGES.USER_CREATED,
    user: userResponse,
  };
};

// =======================================
// Get All Users
// Search + Pagination
// =======================================

export const getAllUsersService = async ({
  search = "",
  page = 1,
  limit = 10,
}) => {
  // =======================================
  // Convert Pagination Values
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
  // Calculate Skip
  // =======================================

  const skip = (page - 1) * limit;

  // =======================================
  // Search Filter
  // =======================================

  const filter = {};

  if (search.trim()) {
    filter.$or = [
      {
        name: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        email: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  // =======================================
  // Count Total Matching Users
  // =======================================

  const totalUsers =
    await User.countDocuments(filter);

  // =======================================
  // Fetch Paginated Users
  // =======================================

  const users = await User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  // =======================================
  // Calculate Total Pages
  // =======================================

  const totalPages =
    Math.ceil(
      totalUsers / limit
    ) || 1;

  // =======================================
  // Return Result
  // =======================================

  return {
    message:
      "Users fetched successfully.",

    users,

    totalUsers,

    totalPages,

    currentPage: page,

    limit,
  };
};

// =======================================
// Get User By ID
// =======================================

export const getUserByIdService = async (
  id
) => {
  const user = await User.findById(id)
    .select("-password")
    .lean();

  if (!user) {
    const error = new Error(
      MESSAGES.USER_NOT_FOUND
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message:
      "User fetched successfully.",

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
  const {
    name,
    email,
    role,
  } = userData;

  // =======================================
  // Find User
  // =======================================

  const user =
    await User.findById(id);

  if (!user) {
    const error = new Error(
      MESSAGES.USER_NOT_FOUND
    );

    error.statusCode = 404;

    throw error;
  }

  // =======================================
  // Check Duplicate Email
  // =======================================

  if (
    email &&
    email !== user.email
  ) {
    const existingUser =
      await User.findOne({
        email,
        _id: { $ne: id },
      });

    if (existingUser) {
      const error = new Error(
        MESSAGES.USER_ALREADY_EXISTS
      );

      error.statusCode = 409;

      throw error;
    }
  }

  // =======================================
  // Update Fields
  // =======================================

  user.name =
    name ?? user.name;

  user.email =
    email ?? user.email;

  user.role =
    role ?? user.role;

  await user.save();

  // =======================================
  // Remove Password
  // =======================================

  const updatedUser =
    user.toObject();

  delete updatedUser.password;

  return {
    message:
      "User updated successfully.",

    user: updatedUser,
  };
};

// =======================================
// Change User Status
// =======================================

export const changeUserStatusService =
  async (id, isActive) => {
    // =======================================
    // Find User
    // =======================================

    const user =
      await User.findById(id);

    if (!user) {
      const error = new Error(
        MESSAGES.USER_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    // =======================================
    // Update Status
    // =======================================

    user.isActive = isActive;

    await user.save();

    // =======================================
    // Remove Password
    // =======================================

    const updatedUser =
      user.toObject();

    delete updatedUser.password;

    return {
      message: `User ${
        isActive
          ? "activated"
          : "deactivated"
      } successfully.`,

      user: updatedUser,
    };
  };