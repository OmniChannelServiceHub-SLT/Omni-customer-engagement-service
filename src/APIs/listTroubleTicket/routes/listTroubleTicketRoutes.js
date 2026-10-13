const express = require('express');
const router = express.Router();

const { listTroubleTicketHandler } = require(
  '../controllers/listTroubleTicketController'
);

router.get('/', listTroubleTicketHandler);

module.exports = router;