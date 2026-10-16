const CommunicationMessage = require(
  '../../../models/TMF681_CommunicationMessage'
);

const { validateCommunicationMessage } = require(
  '../../../schemas/communicationMessageValidator'
);

async function createPushNotification(payload) {
  validateCommunicationMessage(payload);

  return CommunicationMessage.create({
    ...payload,
    state: 'initial',
    '@type': payload['@type'] || 'CommunicationMessage',
  });
}

module.exports = {
  createPushNotification,
};