const { createServiceRequest } = require(
  '../services/serviceRequestService'
);

const {
  toResourceResponse,
  toLegacyResponse,
} = require('../mappers/serviceRequestMapper');

async function createServiceRequestHandler(req, res, next) {
  try {
    const record = await createServiceRequest(
      req.body
    );

    res.location(record.href);

    if (
      req.headers['x-response-format'] === 'legacy'
    ) {
      return res.status(201).json(
        toLegacyResponse()
      );
    }

    return res.status(201).json(
      toResourceResponse(record)
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createServiceRequestHandler,
};