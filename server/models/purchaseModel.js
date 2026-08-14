import mongoose from "mongoose";

// =======================================
// Purchase Medicine Schema
// =======================================

const purchaseMedicineSchema =
  new mongoose.Schema(
    {
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

      purchasePrice: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      _id: false,
    }
  );

// =======================================
// Purchase Schema
// =======================================

const purchaseSchema =
  new mongoose.Schema(
    {
      // ===================================
      // Supplier
      // ===================================

      supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
      },

      // ===================================
      // Invoice Number
      // ===================================

      invoiceNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      // ===================================
      // Purchase Date
      // ===================================

      purchaseDate: {
        type: Date,
        default: Date.now,
      },

      // ===================================
      // Medicines
      // ===================================

      medicines: {
        type: [purchaseMedicineSchema],
        required: true,

        validate: {
          validator: function (value) {
            return value.length > 0;
          },

          message:
            "At least one medicine is required.",
        },
      },

      // ===================================
      // Total Amount
      // ===================================

      totalAmount: {
        type: Number,
        required: true,
        min: 0,
      },

      // ===================================
      // Created By
      // ===================================

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

// =======================================
// Model
// =======================================

const Purchase =
  mongoose.model(
    "Purchase",
    purchaseSchema
  );

export default Purchase;