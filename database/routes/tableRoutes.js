const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.post('/create-table', tableController.createTable);

module.exports = router;
