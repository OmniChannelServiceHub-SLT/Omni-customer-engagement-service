const { createTroubleTicket } = require(
  '../services/troubleTicketService'
);

const {
  toLegacyResponse,
  toTmfResponse,
} = require('../mappers/troubleTicketMapper');

async function createTroubleTicketHandler(req, res, next) {
  try {
    const ticket = await createTroubleTicket(req.body);

    res.location(ticket.href);

    if (req.headers['x-response-format'] === 'legacy') {
      return res.status(201).json(
        toLegacyResponse(ticket)
      );
    }

    return res.status(201).json(
      toTmfResponse(ticket)
    );
  } catch (err) {
    next(err);
  }
}

module.exports = { createTroubleTicketHandler };