import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Access denied, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Get user from DB

    if (!req.user) return res.status(401).json({ message: "User not found" });

    next(); // Move to the next function
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
