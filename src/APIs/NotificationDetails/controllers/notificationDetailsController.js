const { getNotificationDetails } = require(
  '../services/notificationDetailsService'
);

async function getNotificationDetailsHandler(req, res, next) {
  try {
    // The current contract does not define query parameters.
    if (Object.keys(req.query).length > 0) {
      const err = new Error(
        'NotificationDetails does not support query parameters'
      );

      err.status = 400;
      err.code = 'INVALID_REQUEST';

      throw err;
    }

    const notifications = await getNotificationDetails();

    return res.status(200).json({
      isSuccess: true,
      errorMessege: null,
      exceptionDetail: null,
      dataBundle: notifications,
      errorShow: null,
      errorCode: null,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getNotificationDetailsHandler,
};