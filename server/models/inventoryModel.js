import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
      unique: true,
    },

    currentStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    reorderLevel: {
      type: Number,
      default: 20,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;