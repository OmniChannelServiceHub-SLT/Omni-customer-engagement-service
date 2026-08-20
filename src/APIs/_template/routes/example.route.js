const express = require('express');
const controller = require('../controllers/example.controller');

const router = express.Router();

// Replace with the exact TMF-aligned path and HTTP method from the mapping sheet.
router.get('/exampleOperation', controller.handle);

module.exports = router;
