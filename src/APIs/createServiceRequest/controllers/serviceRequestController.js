const { createServiceRequest } = require(
  '../services/serviceRequestService'
);

async function createServiceRequestHandler(req, res, next) {
  try {
    const record = await createServiceRequest(req.body);

    return res
      .location(record.href)
      .status(201)
      .json(record.toJSON());
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createServiceRequestHandler,
};