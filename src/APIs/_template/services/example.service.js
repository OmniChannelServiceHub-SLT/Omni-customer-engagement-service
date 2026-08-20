async function execute(req) {
  // TODO:
  // 1. Validate request according to API Params / MIS contract.
  // 2. Implement the mapped TMF-aligned business behavior.
  // 3. Return the exact documented response where one exists.
  throw Object.assign(new Error('Template API is not implemented.'), {
    status: 501,
    code: 'E501',
  });
}

module.exports = { execute };
