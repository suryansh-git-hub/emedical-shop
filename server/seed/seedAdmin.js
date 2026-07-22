import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import User from "../models/User.js";

import { hashPassword } from "../utils/hashPassword.js";
import { ROLES } from "../constants/roles.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect Database
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({
      role: ROLES.ADMIN,
    });

    if (adminExists) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    // Hash Password
    const hashedPassword = await hashPassword("admin123");

    // Create Admin
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: ROLES.ADMIN,
    });

    console.log("Admin created successfully.");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedAdmin();