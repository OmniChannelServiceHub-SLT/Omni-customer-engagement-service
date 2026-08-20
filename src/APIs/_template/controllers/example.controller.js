const service = require('../services/example.service');

async function handle(req, res, next) {
  try {
    const result = await service.execute(req);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

module.exports = { handle };
