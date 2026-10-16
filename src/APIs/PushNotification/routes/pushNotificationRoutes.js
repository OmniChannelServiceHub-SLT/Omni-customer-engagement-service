const express = require('express');
const router = express.Router();

const { createPushNotificationHandler } = require(
  '../controllers/pushNotificationController'
);

router.post('/', createPushNotificationHandler);

module.exports = router;