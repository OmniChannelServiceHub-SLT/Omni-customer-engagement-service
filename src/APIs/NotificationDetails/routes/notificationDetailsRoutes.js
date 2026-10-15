const express = require('express');
const router = express.Router();

const { getNotificationDetailsHandler } = require(
  '../controllers/notificationDetailsController'
);

router.get('/', getNotificationDetailsHandler);

module.exports = router;