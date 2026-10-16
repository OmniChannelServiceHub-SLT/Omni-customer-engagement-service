const { sendPushNotifyTimely } = require(
  '../services/sendPushNotifyTimelyService'
);

async function sendPushNotifyTimelyHandler(req, res, next) {
  try {
    const message = await sendPushNotifyTimely(
      req.body
    );

    return res
      .location(message.href)
      .status(201)
      .json(message.toJSON());
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sendPushNotifyTimelyHandler,
};