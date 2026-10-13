function toTmfResponse(records) {
  return records.map((ticket) => ticket.toJSON());
}

module.exports = { toTmfResponse };