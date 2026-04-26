import Student from "../models/Student.js";

// CREATE STUDENT
export const createStudent = async (req, res) => {
  try {
    if (!req.body.name || !req.body.rollNo || !req.body.className) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const student = await Student.create({
      ...req.body,
      userId: req.body.userId || null,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

// GET ALL STUDENTS (only active)
export const getStudents = async (req, res) => {
  try {
    let students;

    // ADMIN → all students
    if (req.user.role === "admin") {
      students = await Student.find({ isDeleted: false }).sort({
        createdAt: -1,
      });
    }

    // STUDENT → only own data
    else if (req.user.role === "student") {
      students = await Student.find({
        userId: req.user.userId,
        isDeleted: false,
      });
    }

    // others (optional for now)
    else {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// GET SINGLE STUDENT
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true },
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// SOFT DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true },
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
