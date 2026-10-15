const { createTroubleTicket } = require(
  '../services/troubleTicketService'
);

async function createTroubleTicketHandler(req, res, next) {
  try {
    const ticket = await createTroubleTicket(req.body);

    return res
      .location(ticket.href)
      .status(201)
      .json(ticket.toJSON());
  } catch (err) {
    next(err);
  }
}

module.exports = { createTroubleTicketHandler };