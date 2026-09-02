const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    isSuccess: true,
    message: 'pong',
    service: 'omnichannel-customer-engagement-service',
    port: Number(process.env.PORT || 3003),
    correlationId: req.correlationId || null,
  });
});

module.exports = router;
