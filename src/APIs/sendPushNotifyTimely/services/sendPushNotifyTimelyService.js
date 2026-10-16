const CommunicationMessage = require(
  '../../../models/TMF681_CommunicationMessage'
);

const { validateCommunicationMessage } = require(
  '../../../schemas/communicationMessageValidator'
);

function invalidRequest(message) {
  const err = new Error(message);

  err.status = 400;
  err.code = 'INVALID_REQUEST';

  return err;
}

async function sendPushNotifyTimely(payload) {
  // Validate the standard TMF681 request structure first.
  validateCommunicationMessage(payload);

  // Local business rule for this initial Timely endpoint.
  for (const receiver of payload.receiver) {
    if (
      typeof receiver.phoneNumber !== 'string' ||
      !receiver.phoneNumber.trim()
    ) {
      throw invalidRequest(
        'Every receiver must have a non-empty phoneNumber'
      );
    }
  }

  const characteristics = payload.characteristic || [];

  const packageIds = characteristics.filter(
    (item) => item.name === 'packageid'
  );

  if (
    packageIds.length !== 1 ||
    typeof packageIds[0].value !== 'string' ||
    !packageIds[0].value.trim()
  ) {
    throw invalidRequest(
      'Exactly one packageid characteristic with a non-empty string value is required'
    );
  }

  // Reserve notificationPurpose for server-controlled classification.
  if (
    characteristics.some(
      (item) => item.name === 'notificationPurpose'
    )
  ) {
    throw invalidRequest(
      'notificationPurpose is managed by the server'
    );
  }

  return CommunicationMessage.create({
    ...payload,

    characteristic: [
      ...characteristics,
      {
        name: 'notificationPurpose',
        valueType: 'string',
        value: 'TimelyPay',
      },
    ],

    state: 'initial',
    '@type': payload['@type'] || 'CommunicationMessage',
  });
}

module.exports = {
  sendPushNotifyTimely,
};