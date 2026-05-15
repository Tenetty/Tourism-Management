const express = require("express");
const Hotel = require("../models/Hotel.js");

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  getMyHotels,
  getAllHotelsAdmin,
  countByCity,
  countByType,
  getHotelbyCity,
  getHotelRooms,
  approveHotel,
  rejectHotel,
} = require("../controllers/hotel.js");

const {
  requireHotelManager,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Create
router.post("/", requireHotelManager, createHotel);

// Update
router.put("/approve/:id", requireAdmin, approveHotel);
router.put("/reject/:id", requireAdmin, rejectHotel);
router.put("/:id", requireHotelManager, updateHotel);

// Delete
router.delete("/:id", requireHotelManager, deleteHotel);

// ✅ IMPORTANT: All named GET routes MUST come before "/:id" routes
router.get("/all", requireAdmin, getAllHotelsAdmin);
router.get("/mine", requireHotelManager, getMyHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/get/:city", getHotelbyCity);
router.get("/room/:id", getHotelRooms);
router.get("/find/:id", getHotel);
router.get("/", getAllHotel);

module.exports = router;