// backend/routes/contractRoutes.jsconst express = require('express');
const express = require('express');
const router = express.Router();

const { getBarChartData, getPieChartData } = require('../controllers/states');

router.get('/contracts/bar-chart-data', getBarChartData);
router.get('/contracts/pie-chart-data', getPieChartData);

module.exports = router;
