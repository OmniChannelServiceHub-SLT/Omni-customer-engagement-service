const express = require('express');
const router = express.Router();

const { createServiceRequestHandler } = require(
  '../controllers/serviceRequestController'
);

router.post('/', createServiceRequestHandler);

module.exports = router;