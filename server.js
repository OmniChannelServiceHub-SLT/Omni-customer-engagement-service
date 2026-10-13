require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3009;

async function start() {
  if (!process.env.PUBLIC_BASE_URL) {
    throw new Error('PUBLIC_BASE_URL is not set in .env');
  }

  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(
      `[SERVER] Customer Engagement Service running on port ${PORT}`
    );
  });

  server.on('error', (err) => {
    console.error('[SERVER]', err.message);
    process.exit(1);
  });
}

start().catch((err) => {
  console.error('[STARTUP]', err.message);
  process.exit(1);
});