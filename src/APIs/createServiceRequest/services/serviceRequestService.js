const ServiceRequest = require(
  '../../../models/SLT_ServiceRequest'
);

function invalidRequest(message) {
  const err = new Error(message);

  err.status = 400;
  err.code = 'INVALID_REQUEST';

  return err;
}

async function createServiceRequest(payload) {
  if (
    !payload ||
    typeof payload !== 'object' ||
    Array.isArray(payload)
  ) {
    throw invalidRequest(
      'Request body must be a JSON object'
    );
  }

  const requiredFields = [
    'description',
    'SRType',
    'INSArea',
    'INSSubArea',
    'ServiceId',
    'TTSource',
  ];

  const optionalFields = [
    'note',
    'notetype',
  ];

  const allowedFields = new Set([
    ...requiredFields,
    ...optionalFields,
  ]);

  for (const field of Object.keys(payload)) {
    if (!allowedFields.has(field)) {
      throw invalidRequest(
        `Unsupported field: ${field}`
      );
    }
  }

  for (const field of requiredFields) {
    if (
      typeof payload[field] !== 'string' ||
      !payload[field].trim()
    ) {
      throw invalidRequest(
        `${field} is required and must be a non-empty string`
      );
    }
  }

  for (const field of optionalFields) {
    if (
      payload[field] !== undefined &&
      typeof payload[field] !== 'string'
    ) {
      throw invalidRequest(
        `${field} must be a string`
      );
    }
  }

  const data = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      data[field] = payload[field].trim();
    }
  }

  return ServiceRequest.create(data);
}

module.exports = { createServiceRequest };