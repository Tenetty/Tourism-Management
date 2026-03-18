
const express=require("express");

const {
    createRoom,updateRoom, deleteRoom, getRoom, getAllRoom, updateRoomAvailability
  } = require("../controllers/room.js");

const router =express.Router();

const { requireHotelManager } = require("../middleware/authMiddleware");

// must be change after user auth done

//Create
router.post("/:hotelid", requireHotelManager, createRoom)

//update
router.put("/:id", requireHotelManager, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

//Delete
router.delete("/:id/:hotelid", requireHotelManager, deleteRoom)

//get
router.get("/:id", getRoom)

// Get all hotels
router.get("/",getAllRoom)


module.exports = router 