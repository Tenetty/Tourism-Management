const express=require("express");
const Hotel = require("../models/hotelReservationModel");
const { userMiddleware } = require("../middleware/authMiddleware");
const {
    reservation, getAllReservation, getUserReservations
  } = require("../controllers/hotelReservation.js");

  const router =express.Router();
  //Create
  router.post("/reservation",reservation)
  router.get("/getAll",getAllReservation)
  router.get("/user", userMiddleware, getUserReservations)


module.exports = router;
   