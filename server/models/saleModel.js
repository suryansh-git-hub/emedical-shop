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

  gst: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});
const saleSchema = new mongoose.Schema(
  {
    // ==========================
    // Customer
    // ==========================

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
      validate: [
        (value) => value.length > 0,
        "At least one medicine is required.",
      ],
    },

    // ==========================
    // Billing
    // ==========================

    subtotal: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    gstAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    discountType: {
      type: String,
      enum: ["flat", "percentage"],
      default: "flat",
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    redeemedPoints: {
  type: Number,
  default: 0,
  min: 0,
},

earnedPoints: {
  type: Number,
  default: 0,
  min: 0,
},

    grandTotal: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // Keeping this for compatibility with existing code
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // ==========================
    // Payment
    // ==========================

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Net Banking"],
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      default: "Paid",
    },

    cashReceived: {
      type: Number,
      default: 0,
      min: 0,
    },

    changeReturned: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ==========================
    // Invoice
    // ==========================

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Completed", "Cancelled"],
      default: "Completed",
    },

    // ==========================
    // Created By
    // ==========================

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