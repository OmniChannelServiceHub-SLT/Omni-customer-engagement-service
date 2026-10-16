const express = require('express');
const router = express.Router();

const { sendPushNotifyTimelyHandler } = require(
  '../controllers/sendPushNotifyTimelyController'
);

router.post('/', sendPushNotifyTimelyHandler);

module.exports = router;