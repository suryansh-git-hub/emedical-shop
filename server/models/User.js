import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email:{
      type: String,
      required:[true,"Email is required"],
      unique:true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required:[true, "Please enter password"],
      minlength: 8,
    },
     role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.PHARMACIST],
      default: ROLES.PHARMACIST,
    },
    isActive:{
      type:Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;