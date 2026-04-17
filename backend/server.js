import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import fileRoutes from "./routes/fileRoutes.js";
import authRoutes from "./routes/bookRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload", express.static("uploads"));

app.use("/api", fileRoutes);

app.use("/api", authRoutes);
app.use("/api", issueRoutes);

app.get("/", (req, res) => {
  res.send("Hello World API");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
