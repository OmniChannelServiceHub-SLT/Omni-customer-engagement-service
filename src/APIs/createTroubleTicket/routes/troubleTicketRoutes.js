const express = require('express');
const router = express.Router();

const { createTroubleTicketHandler } = require(
  '../controllers/troubleTicketController'
);

router.post(
  '/',
  authenticate,
  createTroubleTicketHandler
);

module.exports = router;