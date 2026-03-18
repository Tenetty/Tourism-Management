const mongoose = require('mongoose');
const Activity = require('./models/SpecialActivityModel');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/RTMS').then(async () => {
  const q = "?auto=format&fit=crop&w=500&q=80";
  await Activity.updateOne({name: 'Colombo City Heritage Walk'}, {image: 'https://images.unsplash.com/photo-1546708973-c603b5eb2219' + q});
  await Activity.updateOne({name: 'Galle Fort Exploration'}, {image: 'https://images.unsplash.com/photo-1549552199-0e86b9cc6777' + q});
  await Activity.updateOne({name: "Horton Plains & World's End Hike"}, {image: 'https://images.unsplash.com/photo-1590480922894-3a52c1e7a057' + q});
  await Activity.updateOne({name: 'Temple of the Tooth Relic Visit'}, {image: 'https://images.unsplash.com/photo-1588653205168-3e54fa4fb5cb' + q});
  await Activity.updateOne({name: 'Ella Rock Hike'}, {image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d' + q});
  console.log('Fixed Activity URLs');
  process.exit(0);
});
