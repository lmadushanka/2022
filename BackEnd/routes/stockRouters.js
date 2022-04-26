const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const { createStock, getAllStocks, getStockById, updateStock, getSumAllProductWise, getStockAmountByRouteProduct, deleteStock, getMainStock, getAllStocksGroupByProductWise, getStockByRoute } = require('../controllers/sotckController');

router.get('/getAllStockProduct', checkToken, getSumAllProductWise);
router.post('/', checkToken, createStock).get('/', checkToken, getAllStocks).get('/main', checkToken, getMainStock).get('/all-sum', checkToken, getAllStocksGroupByProductWise);
router.get('/:id', checkToken, getStockById).delete('/:id', checkToken, deleteStock).patch('/:id', checkToken, updateStock);
router.get('/route/:routeId', checkToken, getStockByRoute);
router.post('/stock-amount', checkToken, getStockAmountByRouteProduct);

module.exports = router;