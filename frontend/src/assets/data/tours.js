const tours = [
  {
    id: 1,
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
      {
        name: "chill",
        rating: 4.4,
      },
    ],
    avgRating: 4.5,
    featured: false,
    number: "T10500",
    route:
      "https://firebasestorage.googleapis.com/v0/b/travely-7264c.appspot.com/o/route1.png?alt=media&token=99974a15-ffab-4900-b805-5da493d16d73",
    dayDetails: [
      {
        day: "1",
        desc: "Arrive at the village and settle into your eco-lodge surrounded by lush greenery. After a refreshing welcome drink, take a guided walk through the paddy fields and meet the local farming community. In the evening, enjoy a traditional dinner prepared with freshly harvested ingredients.",
      },
      {
        day: "2",
        desc: "Start the day with a sunrise trek through misty hill trails, passing tea estates and spice gardens. Visit a local tea factory to learn about the art of tea making and sample freshly brewed varieties. In the afternoon, explore a nearby waterfall and enjoy a picnic lunch by the stream.",
      },
      {
        day: "3",
        desc: "Embark on a cultural village tour featuring traditional handicraft workshops, pottery making, and weaving demonstrations. Visit a centuries-old temple and learn about the region's heritage. End the day with a campfire storytelling session under the stars.",
      },
      {
        day: "4",
        desc: "Take a scenic boat ride along a tranquil rural river, spotting exotic birds and wildlife along the way. Visit a coconut plantation and learn about traditional toddy tapping. Enjoy a cooking class where you'll prepare authentic village recipes using local spices and ingredients.",
      },
      {
        day: "5",
        desc: "On the final day, visit a rural school and participate in a community engagement programme. Explore the local market for handmade souvenirs and organic produce. Bid farewell to the village with a traditional dance performance and depart with unforgettable memories.",
      },
    ],
    inclusions: [
      "Accommodation in eco-lodges and village homestays",
      "All meals featuring traditional local cuisine",
      "Guided tours with experienced local guides",
    ],
    exclusions: [
      "Personal expenses and tips for local guides",
      "Travel insurance and medical expenses",
      "Transport to and from the tour starting point",
    ],
  },
];

export default tours;
