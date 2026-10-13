const express = require('express');
const router = express.Router();

const { createTroubleTicketHandler } = require(
  '../controllers/troubleTicketController'
);

const { authenticate } = require(
  '../../../middleware/authMiddleware'
);

router.post(
  '/',
  authenticate,
  createTroubleTicketHandler
);

module.exports = router;