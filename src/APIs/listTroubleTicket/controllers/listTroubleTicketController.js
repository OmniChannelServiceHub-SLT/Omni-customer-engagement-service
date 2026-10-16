const {
  listTroubleTicket,
  retrieveTroubleTicket,
} = require('../services/listTroubleTicketService');

const supportedStatuses = [
  'acknowledged',
  'rejected',
  'pending',
  'held',
  'inProgress',
  'cancelled',
  'closed',
  'resolved',
];

const selectableFields = new Set([
  'id',
  'href',
  '@type',
  '@baseType',
  '@schemaLocation',
  'name',
  'description',
  'severity',
  'ticketType',
  'priority',
  'externalId',
  'status',
  'creationDate',
  'lastUpdate',
  'expectedResolutionDate',
  'requestedResolutionDate',
  'resolutionDate',
  'statusChangeDate',
  'statusChangeReason',
  'channel',
  'relatedParty',
  'relatedEntity',
  'note',
  'attachment',
  'statusChange',
  'troubleTicketRelationship',
]);

function invalidRequest(message) {
  const err = new Error(message);
  err.status = 400;
  err.code = 'INVALID_REQUEST';
  return err;
}

function checkQueryNames(query, allowedNames) {
  const allowed = new Set(allowedNames);

  for (const key of Object.keys(query)) {
    if (!allowed.has(key)) {
      throw invalidRequest(
        `Unsupported query parameter: ${key}`
      );
    }
  }
}

function readString(value, name) {
  if (value === undefined) {
    return undefined;
  }

  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    throw invalidRequest(
      `${name} must be a non-empty string`
    );
  }

  return value;
}

function readInteger(
  value,
  defaultValue,
  name,
  minimum,
  maximum
) {
  if (value === undefined) {
    return defaultValue;
  }

  if (
    typeof value !== 'string' ||
    !/^\d+$/.test(value)
  ) {
    throw invalidRequest(
      `${name} must be an integer`
    );
  }

  const number = Number(value);

  if (
    !Number.isSafeInteger(number) ||
    number < minimum ||
    number > maximum
  ) {
    throw invalidRequest(
      `${name} must be between ${minimum} and ${maximum}`
    );
  }

  return number;
}

function readFields(value) {
  if (value === undefined) {
    return null;
  }

  readString(value, 'fields');

  const fields = value
    .split(',')
    .map((field) => field.trim());

  for (const field of fields) {
    if (!selectableFields.has(field)) {
      throw invalidRequest(
        `Unsupported response field: ${field}`
      );
    }
  }

  return [...new Set(fields)];
}

function serializeTicket(ticket, fields) {
  const json = ticket.toJSON();

  if (!fields) {
    return json;
  }

  // Always retain resource identity.
  const selected = {
    id: json.id,
    href: json.href,
  };

  for (const field of fields) {
    if (
      Object.prototype.hasOwnProperty.call(json, field)
    ) {
      selected[field] = json[field];
    }
  }

  return selected;
}

async function listTroubleTicketHandler(req, res, next) {
  try {
    checkQueryNames(req.query, [
      'id',
      'status',
      'relatedParty.id',
      'ticketType',
      'description',
      'severity',
      'offset',
      'limit',
      'fields',
    ]);

    const id = readString(req.query.id, 'id');

    const status = readString(
      req.query.status,
      'status'
    );

    const relatedPartyId = readString(
      req.query['relatedParty.id'],
      'relatedParty.id'
    );

    const ticketType = readString(
      req.query.ticketType,
      'ticketType'
    );

    const description = readString(
      req.query.description,
      'description'
    );

    const severity = readString(
      req.query.severity,
      'severity'
    );

    if (
      status !== undefined &&
      !supportedStatuses.includes(status)
    ) {
      throw invalidRequest(
        'Invalid trouble ticket status'
      );
    }

    const offset = readInteger(
      req.query.offset,
      0,
      'offset',
      0,
      Number.MAX_SAFE_INTEGER
    );

    const limit = readInteger(
      req.query.limit,
      20,
      'limit',
      1,
      100
    );

    const fields = readFields(req.query.fields);

    const { records, totalCount } =
      await listTroubleTicket({
        id,
        status,
        relatedPartyId,
        ticketType,
        description,
        severity,
        offset,
        limit,
      });

    res.setHeader(
      'X-Total-Count',
      String(totalCount)
    );

    res.setHeader(
      'X-Result-Count',
      String(records.length)
    );

    return res.status(200).json(
      records.map((ticket) =>
        serializeTicket(ticket, fields)
      )
    );
  } catch (err) {
    next(err);
  }
}

async function retrieveTroubleTicketHandler(req, res, next) {
  try {
    checkQueryNames(req.query, ['fields']);

    const fields = readFields(req.query.fields);

    const ticket = await retrieveTroubleTicket(
      req.params.id
    );

    if (!ticket) {
      const err = new Error(
        'Trouble ticket not found'
      );

      err.status = 404;
      err.code = 'NOT_FOUND';

      throw err;
    }

    return res.status(200).json(
      serializeTicket(ticket, fields)
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listTroubleTicketHandler,
  retrieveTroubleTicketHandler,
};