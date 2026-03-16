// const tourReserve = require("../models/tourBook");

// const bookTour = async (req, res) => {
//   try {
//     console.log("ava");
//     const newRes = new tourReserve(req.body);
//     const saveRes = await newRes.save();

//     res.status(200).json({
//       status: "Success",
//       message:
//         "Your have SuccessFully booked this tour, One of our Agent will contact you!",
//       data: {
//         book: saveRes,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "Unsuccess",
//       message: "Error Booking Tour",
//     });
//   }
// };

// const getAllReservations = async (req, res) => {
//   try {
//     const allReservations = await tourReserve.find();
//     res.status(200).send(allReservations);
//   } catch (err) {
//     console.log();
//     res.status(404).json({
//       status: "unsuccess",
//       message: "err.message",
//     });
//   }
// };

// module.exports = { bookTour, getAllReservations };

const tourReserve = require("../models/tourBook");

// Function to book a tour
const bookTour = async (req, res) => {
  try {
    console.log("Booking a tour...");
    const newRes = new tourReserve(req.body); // Create a new reservation
    const saveRes = await newRes.save(); // Save the reservation to the database

    res.status(200).json({
      status: "Success",
      message:
        "You have successfully booked this tour. One of our agents will contact you!",
      data: {
        book: saveRes,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({
      status: "Unsuccessful",
      message: "Error Booking Tour: " + err.message, // Send the error message for more clarity
    });
  }
};

// Function to get all reservations
const getAllReservations = async (req, res) => {
  try {
    const allReservations = await tourReserve.find(); // Fetch all reservations from the database
    res.status(200).json({
      // Send response as JSON
      status: "Success",
      data: allReservations,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      // Use 500 for server errors
      status: "Unsuccessful",
      message: "Error fetching reservations: " + err.message, // Include error message
    });
  }
};

module.exports = { bookTour, getAllReservations };
