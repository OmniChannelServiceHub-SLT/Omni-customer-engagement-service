const { sendPushNotify } = require(
  '../services/sendPushNotifyService'
);

async function sendPushNotifyHandler(req, res, next) {
  try {
    const message = await sendPushNotify(req.body);

    return res
      .location(message.href)
      .status(201)
      .json(message.toJSON());
  } catch (err) {
    next(err);
  }
}

module.exports = { sendPushNotifyHandler };