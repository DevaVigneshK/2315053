import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { requestLogger } from "./middleware/logger.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Notification Backend Running...");
});

app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});