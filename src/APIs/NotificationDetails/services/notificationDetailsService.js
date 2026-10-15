const Notification = require(
  '../../../models/SLT_Notification'
);

async function getNotificationDetails() {
  return Notification.find({
    status: 'ACTIVE',
    noT_TYPE: 'public',
  })
    .select({
      _id: 0,
      notid: 1,
      title: 1,
      message: 1,
      popuP_URL: 1,
      action: 1,
      popuP_TYPE: 1,
      buttoN_TITLE: 1,
      noT_TYPE: 1,
      noT_DATE: 1,
      status: 1,
    })
    .sort({ createdAt: -1, _id: -1 })
    .lean();
}

module.exports = { getNotificationDetails };