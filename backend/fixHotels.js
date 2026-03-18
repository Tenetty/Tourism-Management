const mongoose = require('mongoose');
const Hotel = require('./models/Hotel');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/RTMS').then(async () => {
  await Hotel.updateOne({name: 'Grand Plaza Hotel'}, {
    HotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    HotelImgs: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
    ]
  });
  await Hotel.updateOne({name: 'Ocean View Resort'}, {
    HotelImg: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f4',
    HotelImgs: [
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2'
    ]
  });
  console.log('Fixed URLs');
  process.exit(0);
});
