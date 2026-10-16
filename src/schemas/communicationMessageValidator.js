const Ajv = require('ajv-draft-04');
const addFormats = require('ajv-formats');

const specification = require(
  './TMF681-Communication-v4.0.0.swagger.json'
);

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});

addFormats(ajv);

const createDefinition =
  specification.definitions.CommunicationMessage_Create;

const validate = ajv.compile({
  $schema: 'http://json-schema.org/draft-04/schema#',
  definitions: specification.definitions,
  $ref: '#/definitions/CommunicationMessage_Create',
});

function invalidRequest(message) {
  const err = new Error(message);
  err.status = 400;
  err.code = 'INVALID_REQUEST';
  return err;
}

function validateCommunicationMessage(payload) {
  if (!validate(payload)) {
    throw invalidRequest(
      ajv.errorsText(validate.errors, {
        separator: '; ',
      })
    );
  }

  for (const field of ['content', 'messageType']) {
    if (!payload[field].trim()) {
      throw invalidRequest(
        `${field} must not be empty`
      );
    }
  }

  const allowedFields = new Set(
    Object.keys(createDefinition.properties)
  );

  for (const field of Object.keys(payload)) {
    if (!allowedFields.has(field)) {
      throw invalidRequest(
        `Unsupported field: ${field}`
      );
    }
  }

  // Delivery state/times belong to the service/provider.
  for (const field of [
    'state',
    'sendTime',
    'sendTimeComplete',
  ]) {
    if (
      Object.prototype.hasOwnProperty.call(payload, field)
    ) {
      throw invalidRequest(
        `${field} is managed by the server`
      );
    }
  }
}

module.exports = {
  validateCommunicationMessage,
};