const express = require('express');
const cors = require('cors');

const requestId = require('./middleware/requestId.middleware');

const gatewayIdentity = require('./middleware/gatewayIdentity.middleware');

const errorHandler = require('./middleware/error.middleware');

const troubleTicketRoutes = require('./APIs/createTroubleTicket/routes/troubleTicketRoutes');
const listTroubleTicketRoutes = require('./APIs/listTroubleTicket/routes/listTroubleTicketRoutes');
const serviceRequestRoutes = require('./APIs/createServiceRequest/routes/serviceRequestRoutes');
const notificationDetailsRoutes = require('./APIs/NotificationDetails/routes/notificationDetailsRoutes');
const sendPushNotifyRoutes = require('./APIs/sendPushNotify/routes/sendPushNotifyRoutes');
const sendPushNotifyTimelyRoutes = require('./APIs/sendPushNotifyTimely/routes/sendPushNotifyTimelyRoutes');

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

app.use(
  '/api/serviceRequests',
  gatewayIdentity,
  serviceRequestRoutes
);

app.use(
  '/api/SystemMonitor/NotificationDetails',
  gatewayIdentity,
  notificationDetailsRoutes
);

app.use(
  '/tmf-api/communicationManagement/v4/communicationMessage',
  gatewayIdentity,
  sendPushNotifyRoutes
);

app.use(
  '/tmf-api/communicationManagement/v4/sendPushNotifyTimely',
  gatewayIdentity,
  sendPushNotifyTimelyRoutes
);

// Gateway alias: createTroubleTicket + listTroubleTicket
app.use(
  '/tmf-api/communicationManagement/v4/troubleTicket',
  gatewayIdentity,
  troubleTicketRoutes,
  listTroubleTicketRoutes
);

// Gateway alias: createServiceRequest
app.use(
  '/tmf-api/communicationManagement/v4/serviceRequests',
  gatewayIdentity,
  serviceRequestRoutes
);

// Gateway alias: NotificationDetails
app.use(
  '/tmf-api/communicationManagement/v4/NotificationDetails',
  gatewayIdentity,
  notificationDetailsRoutes
);

app.use((req, res, next) => {
  const err = new Error('Endpoint not found');
  err.status = 404;
  err.code = 'NOT_FOUND';
  next(err);
});

app.use(errorHandler);

module.exports = app;