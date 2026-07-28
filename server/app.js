import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import medicineRoute from "./routes/medicineRoute.js";
import supplierRoute from "./routes/supplierRoute.js";
import customerRoute from "./routes/customerRoute.js"
import purchaseRoute from "./routes/purchaseRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import saleRoute from "./routes/saleRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";

const app = express();

//app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use("/api/medicines", medicineRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/customers", customerRoute);
app.use("/api/purchases", purchaseRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/sales", saleRoute);
app.use("/api/dashboard", dashboardRoute);

export default app;