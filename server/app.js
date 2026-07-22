import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./routes/authRoute.js";

const app = express();

//app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);

export default app;