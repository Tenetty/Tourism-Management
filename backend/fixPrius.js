const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/RTMS').then(async () => {
  await Vehicle.updateOne({model: 'Prius'}, {vehicleMainImg: 'https://images.unsplash.com/photo-1590362891991-f766f107f79c'});
  await Vehicle.updateOne({model: 'Caravan'}, {vehicleMainImg: 'https://images.unsplash.com/photo-1520116468816-95b69f847357'});
  console.log('Fixed URLs');
  process.exit(0);
});
