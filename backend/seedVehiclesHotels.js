const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");
const Vehicle = require("./models/Vehicle");
const User = require("./models/userModel");
require("dotenv").config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/RTMS", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for seeding...");

    // Find owners
    const hotelOwner = await User.findOne({ email: "hotel@dummy.com" });
    const vehicleOwner = await User.findOne({ email: "vehicle@dummy.com" });

    const hotelOwnerId = hotelOwner ? hotelOwner._id : null;
    const vehicleOwnerId = vehicleOwner ? vehicleOwner._id : null;

    const hotels = [
      {
        owner: hotelOwnerId,
        name: "Grand Plaza Hotel",
        title: "Luxury Stay in the Heart of the City",
        type: "Luxury",
        city: "Colombo",
        province: "Western",
        zip: 10100,
        address: "123 Main Road, Colombo",
        distance: "2km from center",
        contactName: "John Doe",
        contactNo: 1234567890,
        numberOfRoomTypes: 5,
        HotelImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        HotelImgs: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
        ],
        description: "Experience luxury and comfort at our premier location. Perfect for business and leisure travelers alike.",
        cheapestPrice: 15000,
        rating: 4.5,
        isApproved: true
      },
      {
        owner: hotelOwnerId,
        name: "Ocean View Resort",
        title: "Relaxing Beachfront Gateway",
        type: "Resort",
        city: "Galle",
        province: "Southern",
        zip: 80000,
        address: "Beach Road, Galle",
        distance: "50m from beach",
        contactName: "Jane Smith",
        contactNo: 9876543210,
        numberOfRoomTypes: 3,
        HotelImg: "https://images.unsplash.com/photo-1584132967334-10e028bd69f4",
        HotelImgs: [
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
          "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
        ],
        description: "Enjoy stunning ocean views, a private beach, and world-class spa facilities.",
        cheapestPrice: 20000,
        rating: 4.8,
        isApproved: true
      },
      {
        owner: hotelOwnerId,
        name: "Mountain Breeze Inn",
        title: "Cozy Stay in the Hills",
        type: "Boutique",
        city: "Nuwara Eliya",
        province: "Central",
        zip: 22200,
        address: "Hilltop Road, Nuwara Eliya",
        distance: "1km from lake",
        contactName: "Sunil Perera",
        contactNo: 7788992211,
        numberOfRoomTypes: 2,
        HotelImg: "https://images.unsplash.com/photo-1517840901100-8179e982acb7",
        HotelImgs: [
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
        ],
        description: "A cool and cozy retreat perfect for families and couples escaping the heat.",
        cheapestPrice: 12000,
        rating: 4.4,
        isApproved: true
      },
      {
        owner: hotelOwnerId,
        name: "Kandy Heritage Hotel",
        title: "Historical Elegance",
        type: "Heritage",
        city: "Kandy",
        province: "Central",
        zip: 20000,
        address: "Temple Road, Kandy",
        distance: "500m from Tooth Relic Temple",
        contactName: "Kamal Rathnayake",
        contactNo: 1122334455,
        numberOfRoomTypes: 4,
        HotelImg: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53",
        HotelImgs: [
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c"
        ],
        description: "Experience the rich culture and history of Kandy in our elegantly restored heritage hotel.",
        cheapestPrice: 18000,
        rating: 4.7,
        isApproved: true
      },
      {
        owner: hotelOwnerId,
        name: "Ella Jungle Resort",
        title: "Eco-friendly Nature Gateway",
        type: "Eco Resort",
        city: "Ella",
        province: "Uva",
        zip: 90090,
        address: "Forest Edge, Ella",
        distance: "3km from Nine Arch Bridge",
        contactName: "Nimal Silva",
        contactNo: 7755661122,
        numberOfRoomTypes: 2,
        HotelImg: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        HotelImgs: [
          "https://images.unsplash.com/photo-1551882547-ff40c0d13c11"
        ],
        description: "Immerse yourself in nature with our eco-friendly cottages surrounded by lush jungle and waterfalls.",
        cheapestPrice: 9500,
        rating: 4.3,
        isApproved: true
      }
    ];

    const vehicles = [
      {
        owner: vehicleOwnerId,
        ownerName: "Mike Transport",
        brand: "Toyota",
        model: "Prius",
        vehicleType: "Car",
        vehicleNumber: "WP-CAB-1234",
        capacity: 4,
        transmissionType: "Automatic",
        fuelType: "Hybrid",
        price: 4500,
        description: "Comfortable hybrid car suitable for family trips. Excellent fuel economy.",
        insuranceImgs: ["https://images.unsplash.com/photo-1450101499163-c8848c66cb85"],
        vehicleMainImg: "https://images.unsplash.com/photo-1590362891991-f766f107f79c",
        vehicleImgs: [
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2"
        ],
        location: "Colombo",
        isApproved: true,
        isAccepted: true
      },
      {
        owner: vehicleOwnerId,
        ownerName: "Travel Vans Sri Lanka",
        brand: "Nissan",
        model: "Caravan",
        vehicleType: "Van",
        vehicleNumber: "WP-NA-5678",
        capacity: 10,
        transmissionType: "Manual",
        fuelType: "Diesel",
        price: 8000,
        description: "Spacious van for group travels. Fully air-conditioned with extra luggage space.",
        insuranceImgs: ["https://images.unsplash.com/photo-1450101499163-c8848c66cb85"],
        vehicleMainImg: "https://images.unsplash.com/photo-1520116468816-95b69f847357",
        vehicleImgs: [
          "https://images.unsplash.com/photo-1542289659-1e247e923e3e"
        ],
        location: "Kandy",
        isApproved: true,
        isAccepted: true
      },
      {
        owner: vehicleOwnerId,
        ownerName: "Auto Rentals Lk",
        brand: "Honda",
        model: "Civic",
        vehicleType: "Car",
        vehicleNumber: "WP-CBA-9988",
        capacity: 4,
        transmissionType: "Automatic",
        fuelType: "Petrol",
        price: 6000,
        description: "Sleek and sporty sedan. Great for city rides and business travel.",
        insuranceImgs: ["https://images.unsplash.com/photo-1450101499163-c8848c66cb85"],
        vehicleMainImg: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
        vehicleImgs: [],
        location: "Colombo",
        isApproved: true,
        isAccepted: true
      },
      {
        owner: vehicleOwnerId,
        ownerName: "Kumara Travels",
        brand: "Suzuki",
        model: "Alto",
        vehicleType: "Car",
        vehicleNumber: "WP-CAX-1122",
        capacity: 4,
        transmissionType: "Manual",
        fuelType: "Petrol",
        price: 3000,
        description: "Budget-friendly compact car. Easy to park and drive in tight city streets.",
        insuranceImgs: ["https://images.unsplash.com/photo-1450101499163-c8848c66cb85"],
        vehicleMainImg: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
        vehicleImgs: [],
        location: "Gampaha",
        isApproved: true,
        isAccepted: true
      },
      {
        owner: vehicleOwnerId,
        ownerName: "Luxury Rides",
        brand: "BMW",
        model: "5 Series",
        vehicleType: "Car",
        vehicleNumber: "WP-CBE-7777",
        capacity: 4,
        transmissionType: "Automatic",
        fuelType: "Petrol",
        price: 15000,
        description: "Premium luxury sedan with leather interior and advanced features.",
        insuranceImgs: ["https://images.unsplash.com/photo-1450101499163-c8848c66cb85"],
        vehicleMainImg: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
        vehicleImgs: [],
        location: "Colombo",
        isApproved: true,
        isAccepted: true
      }
    ];

    for (const h of hotels) {
      const exists = await Hotel.findOne({ name: h.name });
      if (!exists) {
        await Hotel.create(h);
        console.log(`Created hotel: ${h.name}`);
      } else {
        console.log(`Hotel already exists: ${h.name}`);
      }
    }

    for (const v of vehicles) {
      const exists = await Vehicle.findOne({ vehicleNumber: v.vehicleNumber });
      if (!exists) {
        await Vehicle.create(v);
        console.log(`Created vehicle: ${v.brand} ${v.model}`);
      } else {
        console.log(`Vehicle already exists: ${v.vehicleNumber}`);
      }
    }

    console.log("Vehicles and Hotels seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
