import crypto from "crypto";
import nodemailer from "nodemailer";

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

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    const error = new Error(
      "Email already exists."
    );

    error.statusCode = 409;
    throw error;
  }

  const hashedPassword =
    await hashPassword(password);

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

  const user = await User.findOne({
    email,
  });

  if (!user) {
    const error = new Error(
      MESSAGES.INVALID_CREDENTIALS
    );

    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error(
      "Account is inactive."
    );

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
// Forgot Password
// =======================================

export const forgotPasswordService = async ({
  email,
}) => {
  // =====================================
  // Validate email
  // =====================================

  if (!email) {
    const error = new Error(
      "Email is required."
    );

    error.statusCode = 400;
    throw error;
  }

  // =====================================
  // Find user
  // =====================================

  const user = await User.findOne({
    email,
  });

  /*
   * Don't reveal whether an email exists.
   *
   * This prevents user enumeration.
   */

  if (!user) {
    return {
      message:
        "If an account exists with this email, a password reset link has been sent.",
    };
  }

  // =====================================
  // Generate reset token
  // =====================================

  const resetToken =
    crypto.randomBytes(32).toString("hex");

  // =====================================
  // Hash token before storing
  // =====================================

  const hashedToken =
    crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  // =====================================
  // Save token + expiry
  // =====================================

  user.resetPasswordToken =
    hashedToken;

  /*
   * Reset link expires after 15 minutes.
   */

  user.resetPasswordExpires =
    new Date(
      Date.now() + 15 * 60 * 1000
    );

  await user.save();

  // =====================================
  // Create reset URL
  // =====================================

  /*
   * CLIENT_URL is your Vercel frontend URL.
   *
   * Example:
   * https://emedical-shop-6w89.vercel.app
   */

  const resetUrl =
    `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // =====================================
  // Create email transporter
  // =====================================

  const transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

  // =====================================
  // Send reset email
  // =====================================

  await transporter.sendMail({
    from:
      `"eMedi Pharmacy" <${process.env.EMAIL_USER}>`,

    to: user.email,

    subject:
      "Reset Your eMedi Pharmacy Password",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
        background-color: #ffffff;
      ">

        <h2 style="
          color: #2563eb;
          margin-bottom: 10px;
        ">
          eMedi Pharmacy
        </h2>

        <h3>
          Password Reset Request
        </h3>

        <p>
          Hello ${user.name},
        </p>

        <p>
          We received a request to reset
          your eMedi Pharmacy account password.
        </p>

        <p>
          Click the button below to create
          a new password.
        </p>

        <div style="margin: 25px 0;">
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #2563eb;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>
        </div>

        <p>
          This password reset link will expire
          in <strong>15 minutes</strong>.
        </p>

        <p style="
          color: #666666;
          font-size: 14px;
        ">
          If you did not request this password
          reset, you can safely ignore this email.
        </p>

        <p>
          Regards,<br />
          <strong>eMedi Pharmacy Team</strong>
        </p>

      </div>
    `,
  });

  return {
    message:
      "If an account exists with this email, a password reset link has been sent.",
  };
};

// =======================================
// Reset Password
// =======================================

export const resetPasswordService = async ({
  token,
  newPassword,
}) => {
  // =====================================
  // Validate input
  // =====================================

  if (!token || !newPassword) {
    const error = new Error(
      "Reset token and new password are required."
    );

    error.statusCode = 400;
    throw error;
  }

  // =====================================
  // Validate password length
  // =====================================

  if (newPassword.length < 8) {
    const error = new Error(
      "Password must be at least 8 characters."
    );

    error.statusCode = 400;
    throw error;
  }

  // =====================================
  // Hash received token
  // =====================================

  const hashedToken =
    crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

  // =====================================
  // Find user with valid token
  // =====================================

  const user = await User.findOne({
    resetPasswordToken: hashedToken,

    resetPasswordExpires: {
      $gt: new Date(),
    },
  });

  // =====================================
  // Invalid / expired token
  // =====================================

  if (!user) {
    const error = new Error(
      "Password reset link is invalid or expired."
    );

    error.statusCode = 400;
    throw error;
  }

  // =====================================
  // Prevent same password
  // =====================================

  const isSamePassword =
    await comparePassword(
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

  // =====================================
  // Hash new password
  // =====================================

  user.password =
    await hashPassword(newPassword);

  // =====================================
  // Invalidate reset token
  // =====================================

  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  // =====================================
  // Save updated user
  // =====================================

  await user.save();

  return {
    message:
      "Password reset successfully.",
  };
};