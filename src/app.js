require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const requestId = require('./middleware/requestId.middleware');
const gatewayIdentity = require('./middleware/gatewayIdentity.middleware');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === '*'
        ? '*'
        : process.env.CORS_ORIGIN || '*',
    credentials: process.env.CORS_ORIGIN !== '*',
  })
);
app.use(morgan('combined'));
app.use(requestId);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'omnichannel-customer-engagement-service',
    port: Number(process.env.PORT || 3003),
    correlationId: req.correlationId,
  });
});

// IAM JWT is verified in the API Gateway.
// Customer Engagement consumes trusted x-user-* headers from the Gateway.
app.use(gatewayIdentity);

const basePath =
  process.env.SERVICE_BASE_PATH || '/internal-api/engagement/v1';

app.use(basePath, apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    isSuccess: false,
    errorMessege: `No Customer Engagement route matches ${req.method} ${req.originalUrl}`,
    exceptionDetail: null,
    dataBundle: null,
    errorShow: `No Customer Engagement route matches ${req.method} ${req.originalUrl}`,
    errorCode: 'E404',
  });
});

app.use(errorHandler);

module.exports = app;
