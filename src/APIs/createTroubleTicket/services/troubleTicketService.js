const TroubleTicket = require(
  '../../../models/TMF621_TroubleTicket'
);

const { validateCreateRequest } = require(
  '../../../schemas/troubleTicketValidator'
);

async function createTroubleTicket(payload) {
  validateCreateRequest(payload);

  const now = new Date();
  const status = payload.status || 'acknowledged';

  const ticket = await TroubleTicket.create({
    ...payload,
    creationDate: now,
    lastUpdate: now,
    status,
    statusChangeDate: now,
    statusChange: [
      {
        status,
        statusChangeDate: now.toISOString(),
        statusChangeReason:
          payload.statusChangeReason || 'Ticket created',
      },
    ],
  });

  return ticket;
}

module.exports = { createTroubleTicket };