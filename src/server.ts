import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./db/mongoose-connection";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRouter from "./routes/adminRouter";
import userRouter from "./routes/userRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/admin", adminRouter);
app.use("/user", userRouter);
// app.use("/", () => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
