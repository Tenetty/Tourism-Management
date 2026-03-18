const hotelReservation = require("../models/hotelReservationModel");

 const reservation=async (req, res, next) => {

    const {
        hotelId,
        hotelName,
        roomType,
        checkInDate,
        checkOutDate,
        userName,
        userId,
        totalPrice,
        totalDays
    }= req.body

    try{
        const newReservation = new hotelReservation({
            hotelId,
            hotelName,
            roomType,
            checkInDate,
            checkOutDate,
            userName,
            userId,
            totalPrice,
            totalDays
        });
        const savedReservation = await newReservation.save();
        res.status(200).json(savedReservation);
    }
    catch(err){
        next(err)
    }
};

const getAllReservation = async (req, res, next) => {
    
    try {
      const hotels = await hotelReservation.find({
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      res.status(500).json(err);
    }
  };

const getUserReservations = async (req, res, next) => {
    try {
        const reservations = await hotelReservation.find({ userId: req.user });
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOwnerReservations = async (req, res, next) => {
    try {
        // Find all hotels owned by this manager
        const Hotel = require("../models/Hotel");
        const myHotels = await Hotel.find({ owner: req.user._id });
        const myHotelIds = myHotels.map(h => h._id.toString());

        // Find reservations for those hotels
        const reservations = await hotelReservation.find({
            hotelId: { $in: myHotelIds }
        });
        
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteReservation = async (req, res, next) => {
    try {
        await hotelReservation.findByIdAndDelete(req.params.id);
        res.status(200).json("Reservation cancelled successfully.");
    } catch(err) {
        next(err);
    }
};

module.exports = {
    reservation,
    getAllReservation,
    getUserReservations,
    getOwnerReservations,
    deleteReservation
  };