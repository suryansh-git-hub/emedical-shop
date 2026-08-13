import crypto from "crypto";

import User from "../models/userModel.js";

import { comparePassword } from "../utils/comparePassword.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

import { MESSAGES } from "../constants/messages.js";

import nodemailer from "nodemailer";


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

  const user = await User.findOne({ email });

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

export const forgotPasswordService =
  async ({ email }) => {

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


    // =====================================
    // User not found
    // =====================================

    if (!user) {
      /*
       * We intentionally don't reveal
       * whether an email exists.
       *
       * This prevents user enumeration.
       */

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
     * Reset link will expire
     * after 15 minutes.
     */

    user.resetPasswordExpires =
      new Date(
        Date.now() + 15 * 60 * 1000
      );


    await user.save();


    // =====================================
    // Create reset URL
    // =====================================

    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;


    // =====================================
    // Email transporter
    // =====================================

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASSWORD,
        },
      });


    // =====================================
    // Send Email
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
        ">

          <h2 style="color: #2563eb;">
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
            your account password.
          </p>

          <p>
            Click the button below to create
            a new password.
          </p>

          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>

          <p style="margin-top: 25px;">
            This link will expire in
            <strong>15 minutes</strong>.
          </p>

          <p style="color: #666;">
            If you did not request this password
            reset, you can safely ignore this email.
          </p>

          <p>
            Regards,<br />
            eMedi Pharmacy Team
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

export const resetPasswordService =
  async ({
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
    // Save
    // =====================================

    await user.save();


    return {
      message:
        "Password reset successfully.",
    };
  };