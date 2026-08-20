require('dotenv').config();

const app = require('./src/app');
const { connectDatabase } = require('./src/config/db');

const PORT = Number(process.env.PORT || 3003);

async function start() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`OmniChannel Customer Engagement Service listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start Customer Engagement Service:', err.message);
    process.exit(1);
  }
}

start();
