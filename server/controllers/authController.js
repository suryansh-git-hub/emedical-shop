import {
  loginUserService,
  registerUserService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/authService.js";


// =======================================
// Register
// =======================================

export const registerUser = async (
  req,
  res
) => {
  try {
    const result =
      await registerUserService(
        req.body
      );

    res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
    });

  } catch (error) {

    res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================================
// Login
// =======================================

export const loginUser = async (
  req,
  res
) => {
  try {

    const result =
      await loginUserService(
        req.body
      );

    // ===================================
    // Set token as an httpOnly cookie
    //
    // httpOnly means client-side JS can
    // never read or touch this cookie
    // (safer than localStorage against
    // XSS attacks). The browser sends it
    // automatically with every request to
    // our API from now on - the frontend
    // doesn't need to manage it at all.
    //
    // sameSite: "none" + secure: true is
    // required for cookies to work across
    // different domains (frontend on
    // Vercel, backend on Render) in
    // production. In local development
    // (same-site http), "lax" + no secure
    // flag works fine.
    // ===================================

    const isProduction =
      process.env.NODE_ENV === "production";

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction
        ? "none"
        : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
    });

  } catch (error) {

    res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================================
// Profile
// =======================================

export const getProfile = async (
  req,
  res
) => {

  res.status(200).json({
    success: true,
    user: req.user,
  });
};


// =======================================
// Logout
// =======================================

export const logoutUser = async (
  req,
  res
) => {

  const isProduction =
    process.env.NODE_ENV === "production";

  // Must match the same options used when
  // the cookie was set, or the browser
  // won't recognize it as the same cookie
  // to clear.
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction
      ? "none"
      : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
};


// =======================================
// Forgot Password
// =======================================

export const forgotPassword = async (
  req,
  res
) => {

  try {

    const result =
      await forgotPasswordService(
        req.body
      );

    res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================================
// Reset Password
// =======================================

export const resetPassword = async (
  req,
  res
) => {

  try {

    const result =
      await resetPasswordService({
        token: req.params.token,
        newPassword:
          req.body.newPassword,
      });

    res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};