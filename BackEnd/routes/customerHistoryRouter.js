const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const {
    getSalesCountCustomerWise,
    getCustomerWiseSales,
    getGrandTotal,
    totalPaidAmount
} = require('../controllers/customerHistoryControllers');

router.get('/:id', checkToken, getCustomerWiseSales);
router.get('/sales-count/:id', checkToken, getSalesCountCustomerWise);
router.get('/grand-total/:id', checkToken, getGrandTotal);
router.get('/paid-total/:id', checkToken, totalPaidAmount);

module.exports = router;