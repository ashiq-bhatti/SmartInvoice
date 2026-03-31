import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User is already registered!" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      msg: "User created successfully!",
      User: newUser,
    });
    console.log(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server internal error",
    });
  }
};


export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User is not found!" });
    }
    const isPasswordMatch = await bcryptjs.compare(
      password,
      existUser.password,
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials!" });
    }
    const { _id, name, email: userEmail } = existUser;

    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({
      success: true,
      msg: "User logged in successfully!",
      user: {
        _id: existUser._id,
        name: existUser.name,
        email: existUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server internal error",
    });
  }
};

export const testApi = async (req, res) => {
  try {
    res.json({
      msg: "Protected route working",
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server internal error",
    });
  }
};
