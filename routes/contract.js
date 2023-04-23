const express = require('express');

const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/auth');

const {
  create, read, adminRows,filters, qtéRows, reservation

} = require('../controllers/contract');

router.post('/contract', authCheck, adminCheck, create);
router.post('/admin-contracts', adminRows);
router.post('/qty-contracts', qtéRows);
router.get('/contract/:clientRef/:energie', read);
//router.post('/Filters', filters);
router.post('/:id/reserve', reservation);





module.exports = router;