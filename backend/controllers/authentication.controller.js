import User from "../models/user.module.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isActive:true
    });

    res.status(201).json({
      success: true,
      message: "User registered",
      data: newUser
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ 1. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });
    }

    // ✅ 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // ✅ 3. Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "7d" }
    );

    // ✅ 4. Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let Users = await User.find();

    res.status(200).json({
      success: true,
      message: "Users Data Fetch Successfully",
      resultObj: Users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};