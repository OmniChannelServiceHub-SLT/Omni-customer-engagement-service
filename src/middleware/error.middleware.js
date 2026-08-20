module.exports = function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(`[${req.correlationId || 'no-correlation-id'}]`, err.stack || err.message);

  const status = err.status || 500;
  const message = err.publicMessage || err.message || 'Unexpected Customer Engagement service error.';

  res.status(status).json({
    isSuccess: false,
    errorMessege: message,
    exceptionDetail:
      process.env.NODE_ENV === 'production' ? null : err.message || null,
    dataBundle: null,
    errorShow: message,
    errorCode: err.code || 'E500',
  });
};
