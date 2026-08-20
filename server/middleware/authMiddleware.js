import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { MESSAGES } from "../constants/messages.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Prefer the httpOnly cookie (how the
    // browser sends it now). Fall back to
    // the Authorization header so tools
    // like Postman/API testing still work.
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers.authorization;

      if (
        authHeader &&
        authHeader.startsWith("Bearer ")
      ) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.UNAUTHORIZED,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.USER_NOT_FOUND,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.UNAUTHORIZED,
    });
  }
};

export default authMiddleware;