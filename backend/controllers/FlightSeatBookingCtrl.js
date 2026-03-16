require("dotenv").config();

const SeatBookingFlight = require("../models/FlightSeatBooking");
const axios = require("axios");

// get all the selected flights   -- search
const searchFlight = async (req, res) => {
  try {
    const {
      from,
      to,
      travelclass,
      depatureDate,
      passengerCount,
    } = req.body;

    const options = {
      method: "GET",
      url: "https://google-flights2.p.rapidapi.com/api/v1/searchFlights",
      params: {
        departure_id: from,          // e.g. LAX
        arrival_id: to,              // e.g. JFK
        travel_class: travelclass || "ECONOMY",
        adults: passengerCount || 1,
        currency: "USD",
        language_code: "en-US",
        country_code: "US",
        search_type: "best",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
      },
    };

    const response = await axios.request(options);

    // IMPORTANT: keep response frontend-friendly
    res.json(response.data);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

//   try {
//       const response = await axios.request(options);
//       console.log(response.data);
//   } catch (error) {
//       console.error(error);
//   }
// }

//     const options = {
//         method: 'GET',
//         url: 'https://skyscanner44.p.rapidapi.com/search-extended',
//         params: {adults: passengerCount, origin: from, destination: to, departureDate: depatureDate},
//         headers: {
//           'X-RapidAPI-Key': '38a97ad371msh48b4374a05e5976p1ec39cjsn7ad2a7afb3aa',
//           'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
//         }
//       };

//       axios.request(options).then(function (response) {
//           res.json(response.data.itineraries.results);
//       }).catch(function (error) {
//           res.json(error);
//       });
// }

//flight seat booking -  tourist
const flightBooking = async (req, res) => {
  const newSeatBookingFlight = new SeatBookingFlight({
    ...req.body,
  });

  await newSeatBookingFlight
    .save()
    .then((newSeatBookingFlight) => {
      res.json(newSeatBookingFlight);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

//fetch all flight train booking -admin (that need to review)
const fetchAllFlightBookings = async (req, res) => {
  await SeatBookingFlight.find()
    .then((allBooking) => {
      res.json(allBooking);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

// fetch single seat booking - tourist and admin
const getSingleFlightBooking = async (req, res) => {
  const id = req.params.id;

  await SeatBookingFlight.findById(id)
    .then((obj) => {
      res.json(obj);
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};
// fetch all the tickets of single user
const getMyAllTickets = (req, res) => {
  const ID = req.body.userID;

  SeatBookingFlight.find({ userID: ID })
    .then((bookings) => {
      res.json(bookings);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

// deletee seat Reservation    - tourist
const deleteSeatBooking = async (req, res) => {
  const id = req.params.id;

  await SeatBookingFlight.findByIdAndDelete(id)
    .then(() => {
      res.json("deleted");
    })
    .catch((err) => {
      res.json(err.message);
    });
};

// update seatReservation -  tourists
const updateSeatBookingFlight = async (req, res) => {
  const id = req.body.id;

  const {
    userID,
    flightID,
    flightName,
    from,
    to,
    arrivalTime,
    depatureTime,
    date,
    price,
    priceStatus,
    firstName,
    LastName,
    nationality,
    IdCardNumber,
    phoneNumber,
    email,
    isApproved,
  } = req.body;

  const updatedSeatBookingFlight = {
    userID,
    flightID,
    flightName,
    from,
    to,
    arrivalTime,
    depatureTime,
    date,
    price,
    priceStatus,
    firstName,
    LastName,
    nationality,
    IdCardNumber,
    phoneNumber,
    email,
    isApproved,
  };

  await SeatBookingFlight.findByIdAndUpdate(id, updatedSeatBookingFlight)
    .then(() => {
      res.json({ status: "updated" });
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = {
  searchFlight,
  flightBooking,
  fetchAllFlightBookings,
  getSingleFlightBooking,
  deleteSeatBooking,
  updateSeatBookingFlight,
  getMyAllTickets,
};
