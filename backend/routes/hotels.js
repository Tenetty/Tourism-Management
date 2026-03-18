const express=require("express");
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
    rejectHotel

  } = require("../controllers/hotel.js");

const { requireHotelManager, requireAdmin } = require("../middleware/authMiddleware");

const router =express.Router();
//Create
router.post("/", requireHotelManager, createHotel)

//update

router.put("/:id", requireHotelManager, updateHotel)

//Delete

router.delete("/:id", requireHotelManager, deleteHotel)

//Approve (Admin only)
router.put("/approve/:id", requireAdmin, approveHotel)

//Reject (Admin only)
router.put("/reject/:id", requireAdmin, rejectHotel)

// Get all hotels for admin (includes unapproved)
router.get("/all", requireAdmin, getAllHotelsAdmin)

//get
router.get("/find/:id", getHotel)

// Get all hotels (public - only approved)
router.get("/",getAllHotel)

// Get my hotels (hotel manager - includes unapproved)
router.get("/mine", requireHotelManager, getMyHotels)

router.get("/countByCity",countByCity)

router.get("/countByType",countByType)


router.get("/get/:city",getHotelbyCity)

router.get("/room/:id",getHotelRooms);   



module.exports = router    