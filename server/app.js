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

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // such as Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

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

export default app;