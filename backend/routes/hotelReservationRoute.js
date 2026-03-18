const express=require("express");
const Hotel = require("../models/hotelReservationModel");
const { userMiddleware, requireHotelManager } = require("../middleware/authMiddleware");
const {
    reservation, getAllReservation, getUserReservations, getOwnerReservations, deleteReservation
  } = require("../controllers/hotelReservation.js");

  const router =express.Router();
  //Create
  router.post("/reservation",reservation)
  router.get("/getAll",getAllReservation)
  router.get("/user", userMiddleware, getUserReservations)
  router.get("/mine", requireHotelManager, getOwnerReservations)
  router.delete("/:id", userMiddleware, deleteReservation)


module.exports = router;