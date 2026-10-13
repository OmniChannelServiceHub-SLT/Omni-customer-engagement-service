const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');

const errorHandler = require('./middleware/errorHandler');

const troubleTicketRoutes = require('./APIs/createTroubleTicket/routes/troubleTicketRoutes');

const app = express();

app.use(cors());
app.use(requestLogger);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Customer Engagement Service',
  });
});

app.use('/tmf-api/troubleTicket/v4/troubleTicket', troubleTicketRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      reason: 'Endpoint not found',
    },
  });
});

app.use(errorHandler);

module.exports = app;