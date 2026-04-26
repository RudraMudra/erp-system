import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import { verifyToken, checkRole } from "./middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Auth routes
app.use("/api/auth", authRoutes);

// Student routes
app.use("/api/students", studentRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working 🚀" });
});

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user,
  });
});

app.get("/api/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin ✅" });
});

export default app;
