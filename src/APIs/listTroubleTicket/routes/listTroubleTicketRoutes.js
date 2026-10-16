const express = require('express');
const router = express.Router();

const {
  listTroubleTicketHandler,
  retrieveTroubleTicketHandler,
} = require(
  '../controllers/listTroubleTicketController'
);

router.get('/', listTroubleTicketHandler);

router.get('/:id', retrieveTroubleTicketHandler);

module.exports = router;