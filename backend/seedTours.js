const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const Tour = require("./models/tours");

const tours = [
  // ===== Hiking and Trekking =====
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80",
    name: "Mountain Ridge Trek",
    category: "Hiking and Trekking",
    price: 120,
    groupCount: 15,
    languages: "English, Hindi",
    duration: "3",
    cities: "Manali, Shimla",
    description: "Embark on a thrilling 3-day trek through lush mountain ridges, pristine forests, and scenic valleys. Perfect for both beginners and experienced hikers looking to reconnect with nature.",
    introduction: "Discover breathtaking mountain landscapes, camp under starlit skies, and traverse trails that wind through some of the most beautiful countryside terrain. This trek offers a perfect blend of adventure and tranquility.",
  },
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&auto=format&fit=crop&q=80",
    name: "Waterfall Valley Hike",
    category: "Hiking and Trekking",
    price: 85,
    groupCount: 12,
    languages: "English",
    duration: "2",
    cities: "Coorg, Wayanad",
    description: "A 2-day hike through verdant valleys leading to hidden waterfalls and natural swimming pools. Trek through coffee plantations and spice gardens with experienced local guides.",
    introduction: "Immerse yourself in the sights and sounds of rural valleys as you hike past cascading waterfalls, lush greenery, and aromatic spice gardens. An unforgettable nature experience.",
  },

  // ===== Sun and Beach =====
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    name: "Golden Coast Retreat",
    category: "Sun and Beach",
    price: 150,
    groupCount: 20,
    languages: "English, Hindi",
    duration: "4",
    cities: "Goa, Kovalam",
    description: "Spend 4 days relaxing on pristine golden beaches, enjoying water sports, exploring coastal fishing villages, and savoring fresh seafood prepared by local cooks.",
    introduction: "Escape to sun-kissed shores where crystal-clear waters meet golden sands. Experience the laid-back coastal village lifestyle, meet local fishermen, and enjoy the best of beach culture.",
  },
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80",
    name: "Tropical Island Escape",
    category: "Sun and Beach",
    price: 200,
    groupCount: 10,
    languages: "English",
    duration: "5",
    cities: "Andaman, Lakshadweep",
    description: "A 5-day island getaway featuring snorkeling, kayaking, beach camping, and exploring untouched coral reefs. Includes visits to remote fishing communities and local island cuisine.",
    introduction: "Discover tropical paradise islands with turquoise waters and white sandy beaches. Dive into vibrant coral reefs, paddle through mangrove forests, and experience island life at its finest.",
  },

  // ===== Wild Safaries =====
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    name: "Jungle Safari Adventure",
    category: "Wild Safaries",
    price: 180,
    groupCount: 8,
    languages: "English, Hindi",
    duration: "3",
    cities: "Ranthambore, Jim Corbett",
    description: "A 3-day wildlife safari through national parks and nature reserves. Spot tigers, elephants, deer, and exotic birds in their natural habitat with expert wildlife guides.",
    introduction: "Venture deep into the wild on thrilling jeep safaris through dense forests and open grasslands. Witness majestic wildlife up close and learn about conservation efforts from local rangers.",
  },
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop&q=80",
    name: "Wetland Bird Watching Tour",
    category: "Wild Safaries",
    price: 95,
    groupCount: 12,
    languages: "English",
    duration: "2",
    cities: "Bharatpur, Chilika",
    description: "A 2-day bird watching expedition through wetlands and bird sanctuaries. Spot migratory birds, flamingos, pelicans, and rare species with expert ornithologists.",
    introduction: "Explore serene wetlands teeming with birdlife. From graceful flamingos to rare migratory species, this tour offers a peaceful and educational wildlife experience for nature enthusiasts.",
  },

  // ===== Cultural =====
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=80",
    name: "Heritage Village Trail",
    category: "Cultural",
    price: 110,
    groupCount: 15,
    languages: "English, Hindi",
    duration: "3",
    cities: "Jaipur, Udaipur",
    description: "A 3-day cultural journey through historic villages, ancient temples, and traditional artisan workshops. Experience folk music, dance performances, and authentic village hospitality.",
    introduction: "Step back in time as you explore heritage villages where centuries-old traditions are still alive. Visit master craftsmen, watch traditional dance forms, and taste authentic village cuisine.",
  },
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
    name: "Ancient Temple Circuit",
    category: "Cultural",
    price: 130,
    groupCount: 20,
    languages: "English, Hindi, Tamil",
    duration: "4",
    cities: "Hampi, Madurai",
    description: "A 4-day tour of ancient temples, archaeological sites, and historical monuments. Learn about centuries of history, architecture, and the stories behind these magnificent structures.",
    introduction: "Journey through time visiting awe-inspiring temples and ruins that tell stories of ancient civilizations. A must-visit for history buffs and architecture enthusiasts alike.",
  },

  // ===== Special =====
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
    name: "Farm-to-Table Experience",
    category: "Special",
    price: 75,
    groupCount: 10,
    languages: "English",
    duration: "2",
    cities: "Ooty, Kodaikanal",
    description: "A 2-day immersive farm experience where you harvest organic vegetables, learn traditional cooking methods, and enjoy meals prepared with ingredients you picked yourself.",
    introduction: "Get your hands dirty in the best way possible! This unique tour lets you experience the full journey from farm to table, learning sustainable farming practices along the way.",
  },
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&auto=format&fit=crop&q=80",
    name: "Village Craft Workshop",
    category: "Special",
    price: 90,
    groupCount: 8,
    languages: "English, Hindi",
    duration: "2",
    cities: "Kutch, Jodhpur",
    description: "A 2-day hands-on workshop learning traditional village crafts — pottery, weaving, block printing, and embroidery — directly from master artisans in their workshops.",
    introduction: "Unlock your creativity while preserving ancient arts. Learn directly from village artisans who have been practicing these crafts for generations, and take home your own handmade creations.",
  },

  // ===== Festival =====
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&auto=format&fit=crop&q=80",
    name: "Harvest Festival Celebration",
    category: "Festival",
    price: 100,
    groupCount: 25,
    languages: "English, Hindi, Tamil",
    duration: "3",
    cities: "Thanjavur, Mysore",
    description: "A 3-day immersion into the vibrant harvest festival traditions. Participate in traditional rituals, enjoy folk performances, taste festive foods, and celebrate with local communities.",
    introduction: "Experience the joy and colour of rural harvest festivals. Dance to folk music, feast on traditional delicacies, and witness centuries-old rituals that celebrate the bounty of the earth.",
  },
  {
    currentUser: "admin@ruraltourism.com",
    img: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=800&auto=format&fit=crop&q=80",
    name: "Lantern Night Festival Tour",
    category: "Festival",
    price: 115,
    groupCount: 20,
    languages: "English",
    duration: "2",
    cities: "Varanasi, Pushkar",
    description: "A 2-day festival tour featuring thousands of floating lanterns, traditional music, evening boat rides, and spiritual ceremonies by the riverside.",
    introduction: "Witness the magical spectacle of lantern-lit nights along sacred rivers. Join in the celebrations, listen to devotional music, and experience the spiritual side of rural festival culture.",
  },
];

const seedTours = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // Delete existing tours (optional — remove this line if you want to keep existing ones)
    await Tour.deleteMany({});
    console.log("Cleared existing tours.");

    // Insert new tours
    const inserted = await Tour.insertMany(tours);
    console.log(`Successfully seeded ${inserted.length} tours!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding tours:", error.message);
    process.exit(1);
  }
};

seedTours();
