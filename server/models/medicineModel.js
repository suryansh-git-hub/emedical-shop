import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
      trim: true,
    },

    genericName: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    batchNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    manufacturingDate: {
      type: Date,
      required: true,
    },

    medicineImage: {
    type: String,
    default: "",
},

    expiryDate: {
      type: Date,
      required: true,
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
  type: Number,
  required: true,
  min: 0,
  default: 0,
},

    unit: {
      type: String,
      required: true,
      enum: [
     "Strip",
    "Bottle",
    "Box",
    "Tube",
    "Piece",
    "Sachet",
      ],
    },

    gst: {
  type: Number,
  required: true,
  enum: [0, 5, 12, 18, 28],
},

    description: {
      type: String,
      default: "",
    },


  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;