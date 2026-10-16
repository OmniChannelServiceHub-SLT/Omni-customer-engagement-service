const mongoose = require('mongoose');

const TroubleTicket = require(
  '../../../models/TMF621_TroubleTicket'
);

function isValidId(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

async function listTroubleTicket({
  id,
  status,
  relatedPartyId,
  ticketType,
  description,
  severity,
  offset,
  limit,
}) {
  const filter = {};

  // The public id is a virtual derived from MongoDB _id.
  if (id !== undefined) {
    filter._id = isValidId(id)
      ? new mongoose.Types.ObjectId(id)
      : { $in: [] };
  }

  if (status !== undefined) {
    filter.status = status;
  }

  if (relatedPartyId !== undefined) {
    filter['relatedParty.id'] = relatedPartyId;
  }

  if (ticketType !== undefined) {
    filter.ticketType = ticketType;
  }

  if (description !== undefined) {
    filter.description = description;
  }

  if (severity !== undefined) {
    filter.severity = severity;
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

async function retrieveTroubleTicket(id) {
  if (!isValidId(id)) {
    return null;
  }

  return TroubleTicket.findById(id);
}

module.exports = {
  listTroubleTicket,
  retrieveTroubleTicket,
};