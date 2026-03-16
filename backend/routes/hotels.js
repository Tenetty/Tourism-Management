const express=require("express");
const Hotel = require("../models/Hotel.js");

const {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getAllHotel,
    countByCity,
    countByType,
    getHotelbyCity,
    getHotelRooms,
    approveHotel

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

//get
router.get("/find/:id", getHotel)

// Get all hotels
router.get("/",getAllHotel)

router.get("/countByCity",countByCity)

router.get("/countByType",countByType)


router.get("/get/:city",getHotelbyCity)

router.get("/room/:id",getHotelRooms);   



module.exports = router    