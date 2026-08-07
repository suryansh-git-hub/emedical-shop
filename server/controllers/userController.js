import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  changeUserStatusService,
} from "../services/userService.js";

// =======================================
// Create User
// =======================================

export const createUser = async (req, res) => {
  try {
    const result = await createUserService(req.body);

    res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get All Users
// =======================================

export const getAllUsers = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const result = await getAllUsersService(search);

    res.status(200).json({
      success: true,
      message: result.message,
      users: result.users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get User By ID
// =======================================

export const getUserById = async (req, res) => {
  try {
    const result = await getUserByIdService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Update User
// =======================================

export const updateUser = async (req, res) => {
  try {
    const result = await updateUserService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Change User Status
// =======================================

export const changeUserStatus = async (
  req,
  res
) => {
  try {
    const result =
      await changeUserStatusService(
        req.params.id,
        req.body.isActive
      );

    res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};