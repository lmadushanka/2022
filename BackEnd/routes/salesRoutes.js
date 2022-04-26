const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const {
    addSale,
    getSales,
    getProductSale,
    getSaleById,
    updateSales,
    getFreeIssue,
    filterSalesById
} = require('../controllers/salesControllers');

router.post('/', checkToken, addSale).get('/', checkToken, getSales).get('/product/:saleId', checkToken, getProductSale);
router.get('/:saleId', checkToken, getSaleById).patch('/:id', checkToken, updateSales).get('/free-issue/:saleId', checkToken, getFreeIssue);
router.get('/filter/:paymentStatus/:salesStatus', checkToken, filterSalesById);

module.exports = router;