import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    className: { type: String, required: true },
    section: { type: String },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dob: Date,

    guardianName: String,
    guardianPhone: String,

    address: String,

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
