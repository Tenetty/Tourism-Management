const mongoose = require("mongoose");
const SpecialActivity = require("./models/SpecialActivityModel");
const SpecialActivityType = require("./models/SpecialActivityType");
const User = require("./models/userModel");
require("dotenv").config();

const seedActivities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/RTMS", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for seeding activities...");

    const activityAdmin = await User.findOne({ email: "admin@dummy.com" });
    const userId = activityAdmin ? activityAdmin._id : null;

    if (!userId) {
      console.log("Admin user not found. Please seed users first.");
      process.exit(1);
    }

    const types = [
      { name: "Hiking", description: "Outdoor hiking and trekking trails" },
      { name: "Water Sports", description: "Surfing, diving, and boat rides" },
      { name: "Cultural Tour", description: "Visiting heritage sites and temples" },
      { name: "City Tour", description: "Exploring city landmarks and shopping" },
      { name: "Nature Walk", description: "Relaxing walks through gardens and estates" }
    ];

    for (const t of types) {
      const exists = await SpecialActivityType.findOne({ name: t.name });
      if (!exists) {
        await SpecialActivityType.create(t);
        console.log(`Created Activity Type: ${t.name}`);
      }
    }

    const activities = [
      {
        user: userId,
        name: "Colombo City Heritage Walk",
        location: "Colombo",
        dateRange: {
            startDate: new Date("2024-01-01"),
            endDate: new Date("2025-12-31")
        },
        timeRange: {
            startTime: "08:00",
            endTime: "12:00"
        },
        type: "City Tour",
        description: "Explore the bustling streets, old colonial buildings, and dynamic markets of Colombo. Perfect for guests staying at Grand Plaza Hotel.",
        image: "https://images.unsplash.com/photo-1546708973-c603b5eb2219",
        status: "APPROVED"
      },
      {
        user: userId,
        name: "Galle Fort Exploration",
        location: "Galle",
        dateRange: {
            startDate: new Date("2024-01-01"),
            endDate: new Date("2025-12-31")
        },
        timeRange: {
            startTime: "09:00",
            endTime: "14:00"
        },
        type: "Cultural Tour",
        description: "Walk through the historic 17th-century Dutch Fort in Galle. A must-do activity near the Ocean View Resort.",
        image: "https://images.unsplash.com/photo-1549552199-0e86b9cc6777",
        status: "APPROVED"
      },
      {
        user: userId,
        name: "Horton Plains & World's End Hike",
        location: "Nuwara Eliya",
        dateRange: {
            startDate: new Date("2024-01-01"),
            endDate: new Date("2025-12-31")
        },
        timeRange: {
            startTime: "05:00",
            endTime: "13:00"
        },
        type: "Hiking",
        description: "An incredible early morning hike through the misty Horton Plains to witness the breathtaking World's End drop. Great for guests at Mountain Breeze Inn.",
        image: "https://images.unsplash.com/photo-1590480922894-3a52c1e7a057",
        status: "APPROVED"
      },
      {
        user: userId,
        name: "Temple of the Tooth Relic Visit",
        location: "Kandy",
        dateRange: {
            startDate: new Date("2024-01-01"),
            endDate: new Date("2025-12-31")
        },
        timeRange: {
            startTime: "07:00",
            endTime: "18:00"
        },
        type: "Cultural Tour",
        description: "Discover the spiritual heart of Sri Lanka in Kandy. Just a short walk from the Kandy Heritage Hotel.",
        image: "https://images.unsplash.com/photo-1588653205168-3e54fa4fb5cb",
        status: "APPROVED"
      },
      {
        user: userId,
        name: "Ella Rock Hike",
        location: "Ella",
        dateRange: {
            startDate: new Date("2024-01-01"),
            endDate: new Date("2025-12-31")
        },
        timeRange: {
            startTime: "06:00",
            endTime: "11:00"
        },
        type: "Hiking",
        description: "A challenging but rewarding hike up to Ella Rock with panoramic views of the valley. Starts close to Ella Jungle Resort.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        status: "APPROVED"
      }
    ];

    for (const a of activities) {
      const exists = await SpecialActivity.findOne({ name: a.name });
      if (!exists) {
        await SpecialActivity.create(a);
        console.log(`Created Activity: ${a.name}`);
      } else {
        console.log(`Activity already exists: ${a.name}`);
      }
    }

    console.log("Activities seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding activities:", err);
    process.exit(1);
  }
};

seedActivities();
