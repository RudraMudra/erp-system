import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE (admin only)
router.post("/", verifyToken, checkRole("admin"), createStudent);

// READ
router.get("/", verifyToken, getStudents);
router.get("/:id", verifyToken, getStudentById);

// UPDATE (admin only)
router.put("/:id", verifyToken, checkRole("admin"), updateStudent);

// DELETE (admin only)
router.delete("/:id", verifyToken, checkRole("admin"), deleteStudent);

export default router;