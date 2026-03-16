const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");
require("dotenv").config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/RTMS", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for seeding...");

    // Clear existing dummy data users if you want, or just add them
    // await User.deleteMany({ email: { $regex: /dummy/i } });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const dummyUsers = [
      {
        name: "Admin User",
        email: "admin@dummy.com",
        password: hashedPassword,
        mobile: "1234567890",
        country: "USA",
        role: "Admin",
        isAdmin: true,
      },
      {
        name: "Hotel Manager User",
        email: "hotel@dummy.com",
        password: hashedPassword,
        mobile: "1234567891",
        country: "UK",
        role: "Hotel Manager",
        isAdmin: false,
      },
      {
        name: "Vehicle Owner User",
        email: "vehicle@dummy.com",
        password: hashedPassword,
        mobile: "1234567892",
        country: "Canada",
        role: "Vehicle Owner",
        isAdmin: false,
      },
      {
        name: "Restaurant Owner User",
        email: "restaurant@dummy.com",
        password: hashedPassword,
        mobile: "1234567893",
        country: "Australia",
        role: "Restaurant Owner",
        isAdmin: false,
      },
      {
        name: "Standard Tourist",
        email: "tourist@dummy.com",
        password: hashedPassword,
        mobile: "1234567894",
        country: "Japan",
        role: "Tourist",
        isAdmin: false,
      },
    ];

    // Insert new users
    for (const data of dummyUsers) {
      const exists = await User.findOne({ email: data.email });
      if (!exists) {
        await User.create(data);
        console.log(`Created user: ${data.name} (${data.role})`);
      } else {
        console.log(`User already exists: ${data.email}`);
      }
    }

    console.log("Seeding completely successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
