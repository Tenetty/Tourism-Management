const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    numberOfRoomTypes: {
      type: Number,
      required: true,
    },
    HotelImg: {
      type: String,
    },
    HotelImgs: {
      type: [String],
    },
    certificates: {
      type: [String],
    },
    description: {
      type: String,
      reqiured: true,
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    sustainability: {
      type: Boolean,
      default: false,
    },
    availableWork: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      // for accomodation admin
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);
