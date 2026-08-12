import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import medicineRoute from "./routes/medicineRoute.js";
import supplierRoute from "./routes/supplierRoute.js";
import customerRoute from "./routes/customerRoute.js";
import purchaseRoute from "./routes/purchaseRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import saleRoute from "./routes/saleRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import reportRoute from "./routes/reportRoute.js";

const app = express();

// =======================================
// Allowed Frontend Origins
// =======================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://emedical-shop-6w89.vercel.app",
];

// =======================================
// CORS
// =======================================

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // Example: Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =======================================
// Body Parsers
// =======================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// =======================================
// Static Uploads
// =======================================

// Absolute path to uploads folder
const uploadPath = path.join(
  process.cwd(),
  "uploads"
);

// Make uploaded images publicly accessible
app.use(
  "/uploads",
  express.static(uploadPath)
);

// =======================================
// API Routes
// =======================================

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/medicines", medicineRoute);

app.use("/api/suppliers", supplierRoute);

app.use("/api/customers", customerRoute);

app.use("/api/purchases", purchaseRoute);

app.use("/api/inventory", inventoryRoute);

app.use("/api/sales", saleRoute);

app.use("/api/dashboard", dashboardRoute);

app.use("/api/reports", reportRoute);

// =======================================
// Export
// =======================================

export default app;