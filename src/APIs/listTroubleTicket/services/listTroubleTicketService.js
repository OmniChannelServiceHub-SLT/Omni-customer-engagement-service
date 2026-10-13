const TroubleTicket = require(
  '../../../models/TMF621_TroubleTicket'
);

async function listTroubleTicket({
  status,
  relatedPartyId,
  offset,
  limit,
}) {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (relatedPartyId) {
    filter['relatedParty.id'] = relatedPartyId;
  }

  const [records, totalCount] = await Promise.all([
    TroubleTicket.find(filter)
      .sort({ creationDate: -1, _id: -1 })
      .skip(offset)
      .limit(limit),

    TroubleTicket.countDocuments(filter),
  ]);

  return { records, totalCount };
}

module.exports = { listTroubleTicket };