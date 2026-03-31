import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
export const authMiddleware = async(req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized: no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Invaild token" });
  }
};
