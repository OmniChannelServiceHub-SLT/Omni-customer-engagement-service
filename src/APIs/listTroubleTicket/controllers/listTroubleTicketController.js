const { listTroubleTicket } = require(
  '../services/listTroubleTicketService'
);

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

function invalidRequest(message) {
  const err = new Error(message);
  err.status = 400;
  err.code = 'INVALID_REQUEST';
  return err;
}

function readInteger(value, defaultValue, name, minimum, maximum) {
  if (value === undefined) {
    return defaultValue;
  }

  if (
    typeof value !== 'string' ||
    !/^\d+$/.test(value)
  ) {
    throw invalidRequest(`${name} must be an integer`);
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

async function listTroubleTicketHandler(req, res, next) {
  try {
    const allowedQueries = new Set([
      'status',
      'relatedParty.id',
      'offset',
      'limit',
    ]);

    for (const key of Object.keys(req.query)) {
      if (!allowedQueries.has(key)) {
        throw invalidRequest(
          `Unsupported query parameter: ${key}`
        );
      }
    }

    const status = req.query.status;
    const relatedPartyId = req.query['relatedParty.id'];

    if (
      status !== undefined &&
      (
        typeof status !== 'string' ||
        !supportedStatuses.includes(status)
      )
    ) {
      throw invalidRequest('Invalid trouble ticket status');
    }

    if (
      relatedPartyId !== undefined &&
      (
        typeof relatedPartyId !== 'string' ||
        !relatedPartyId.trim()
      )
    ) {
      throw invalidRequest(
        'relatedParty.id must be a non-empty string'
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

    const { records, totalCount } = await listTroubleTicket({
      status,
      relatedPartyId,
      offset,
      limit,
    });

    res.setHeader('X-Total-Count', String(totalCount));
    res.setHeader('X-Result-Count', String(records.length));

    return res.status(200).json(
      records.map((ticket) => ticket.toJSON())
    );
  } catch (err) {
    next(err);
  }
}

module.exports = { listTroubleTicketHandler };