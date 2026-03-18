const mongoose = require("mongoose");
const Train = require("./models/Train");
require("dotenv").config();

const seedTrains = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/RTMS", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for seeding trains...");

    const trains = [
      {
        trainName: "Ella Odyssey",
        from: "Colombo Fort",
        to: "Badulla",
        arrivalTime: "15:55",
        depatureTime: "05:30",
        date: "Daily",
        price: "3000",
        noOfSeats: 120,
        description: "Experience the scenic beauty of Sri Lanka's hill country on this classic tourist train.",
        trainMainImg: "https://images.unsplash.com/photo-1541819665673-8cbaf1d9dce1",
        MaxBagage: "25kg",
        classType: "First Class Observation",
        cancelCharges: "15%"
      },
      {
        trainName: "Yal Devi",
        from: "Colombo Fort",
        to: "Kankesanthurai",
        arrivalTime: "13:30",
        depatureTime: "05:45",
        date: "Daily",
        price: "2500",
        noOfSeats: 200,
        description: "The iconic Queen of Jaffna, offering a smooth ride to the northern peninsula.",
        trainMainImg: "https://images.unsplash.com/photo-1520626337972-0056fb157e33",
        MaxBagage: "30kg",
        classType: "First Class AC",
        cancelCharges: "10%"
      },
      {
        trainName: "Podi Menike",
        from: "Colombo Fort",
        to: "Badulla",
        arrivalTime: "16:00",
        depatureTime: "05:55",
        date: "Daily",
        price: "1500",
        noOfSeats: 400,
        description: "A beautiful journey curving through tea plantations and majestic waterfalls.",
        trainMainImg: "https://images.unsplash.com/photo-1558285549-2a0614457e5b",
        MaxBagage: "20kg",
        classType: "Second Class",
        cancelCharges: "10%"
      },
      {
        trainName: "Ruhunu Kumari",
        from: "Maradana",
        to: "Matara",
        arrivalTime: "19:30",
        depatureTime: "15:40",
        date: "Daily",
        price: "800",
        noOfSeats: 500,
        description: "Coastal train ride along the stunning southern beach border.",
        trainMainImg: "https://images.unsplash.com/photo-1473211516147-3bd07ee501be",
        MaxBagage: "20kg",
        classType: "Second Class",
        cancelCharges: "10%"
      }
    ];

    for (const t of trains) {
      const exists = await Train.findOne({ trainName: t.trainName });
      if (!exists) {
        await Train.create(t);
        console.log(`Created train: ${t.trainName}`);
      } else {
        console.log(`Train already exists: ${t.trainName}`);
      }
    }

    console.log("Trains seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding trains:", err);
    process.exit(1);
  }
};

seedTrains();
