const mongoose = require('mongoose');

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('[Engagement] MONGODB_URI not set; starting without database connection.');
    return;
  }

  await mongoose.connect(uri);
  console.log(`[Engagement] connected to MongoDB (${mongoose.connection.name})`);
}

module.exports = { connectDatabase };
