const express = require('express');
const router = express.Router();

const { createTroubleTicketHandler } = require(
  '../controllers/troubleTicketController'
);

router.post('/', createTroubleTicketHandler);

module.exports = router;