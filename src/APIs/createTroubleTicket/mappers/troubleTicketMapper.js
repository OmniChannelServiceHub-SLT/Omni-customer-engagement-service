function toTmfResponse(ticket) {
  return ticket.toJSON();
}

function toLegacyResponse(ticket) {
  const json = ticket.toJSON();

  return {
    isSuccess: true,
    errorMessege: null,
    exceptionDetail: null,
    dataBundle: [
      {
        'fault Refference': json.externalId || json.id,
        message: 'Successfully Saved.Thank you!',
      },
    ],
    errorShow: null,
    errorCode: null,
  };
}

module.exports = {
  toTmfResponse,
  toLegacyResponse,
};