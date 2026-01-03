import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDb.js";
import userRouter from "./routes/userroute.js";

dotenv.config();

const app = express();
app.set("etag", false);

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://your-frontend-name.vercel.app"
  ],
  credentials: true
}));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

// ✅ REGISTER ROUTES
app.use("/api/user", userRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
