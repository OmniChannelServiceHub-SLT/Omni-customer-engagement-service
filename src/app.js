const express = require('express');
const cors = require('cors');

const requestId = require('./middleware/requestId.middleware');

const gatewayIdentity = require('./middleware/gatewayIdentity.middleware');

const errorHandler = require('./middleware/error.middleware');

const troubleTicketRoutes = require('./APIs/createTroubleTicket/routes/troubleTicketRoutes');
const listTroubleTicketRoutes = require('./APIs/listTroubleTicket/routes/listTroubleTicketRoutes');

const app = express();

app.use(cors());

app.use(requestId);

app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Customer Engagement Service',
  });
});

app.use(
  '/tmf-api/troubleTicket/v4/troubleTicket',
  gatewayIdentity,
  troubleTicketRoutes,
  listTroubleTicketRoutes
);

app.use((req, res, next) => {
  const err = new Error('Endpoint not found');
  err.status = 404;
  err.code = 'NOT_FOUND';
  next(err);
});

app.use(errorHandler);

module.exports = app;