import mongoose from "mongoose";

const saleMedicineSchema = new mongoose.Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  sellingPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const saleSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    saleDate: {
      type: Date,
      default: Date.now,
    },

    medicines: {
      type: [saleMedicineSchema],
      required: true,
      validate: [(value) => value.length > 0, "At least one medicine is required."],
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;