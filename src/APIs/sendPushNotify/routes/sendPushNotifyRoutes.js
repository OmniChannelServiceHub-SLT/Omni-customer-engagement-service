const express = require('express');
const router = express.Router();

const { sendPushNotifyHandler } = require(
  '../controllers/sendPushNotifyController'
);

router.post('/', sendPushNotifyHandler);

module.exports = router;