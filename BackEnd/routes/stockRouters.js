const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const {
    createStock,
    getAllMainStock,
    getStockById,
    updateStock,
    getSumAllProductWise,
    deleteStock,
    getStockByRoute,
    getStockAmountByRouteProduct
} = require('../controllers/sotckController');

router.post('/', checkToken, createStock);
router.get('/', checkToken, getAllMainStock);
router.get('/getAllStockProduct', checkToken, getSumAllProductWise);
router.post('/amount', checkToken, getStockAmountByRouteProduct);
router.get('/:id', checkToken, getStockById);
router.get('/route/:routeId', checkToken, getStockByRoute);
router.delete('/:id', checkToken, deleteStock);
router.patch('/:id', checkToken, updateStock);

module.exports = router;