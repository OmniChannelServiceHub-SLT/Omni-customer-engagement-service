const { createPushNotification } = require(
  '../services/pushNotificationService'
);

async function createPushNotificationHandler(req, res, next) {
  try {
    const message = await createPushNotification(
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
  createPushNotificationHandler,
};