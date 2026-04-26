import User from "../models/User.js";
import bcrypt from "bcrypt";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
