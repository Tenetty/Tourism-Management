const jwt = require("jsonwebtoken");
//normal user
const User = require("../models/userModel.js");
require("dotenv").config();

// Generic role verification helper
const verifyRole = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      // Admin override (Admin can do everything or limit as needed)
      if (user.role && roles.includes(user.role)) {
        req.user = user; // Attach full user object for easy ID access in controllers
        return next();
      }

      // Fallback for legacy isAdmin prop
      if (roles.includes("Admin") && user.isAdmin) {
        req.user = user;
        return next();
      }
      
      return res.status(403).json({ message: `Access denied. Requires one of: ${roles.join(", ")}` });
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};

const requireAdmin = verifyRole(["Admin"]);
const requireHotelManager = verifyRole(["Hotel Manager", "Admin"]);
const requireVehicleOwner = verifyRole(["Vehicle Owner", "Admin"]);
const requireRestaurantOwner = verifyRole(["Restaurant Owner", "Admin"]);

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
//admin
const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded.id, { isAdmin: 1 });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
//activity organizer
const organizerMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded.id, { type: 1 });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.type !== "eventOrganizer") {
      return res.status(403).json({ message: "Access denied" });
    }
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = {
  userMiddleware,
  adminMiddleware,
  organizerMiddleware,
  requireAdmin,
  requireHotelManager,
  requireVehicleOwner,
  requireRestaurantOwner
};
