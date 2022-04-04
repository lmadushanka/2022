const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const { createStock, getAllStocks, getStockById, updateStock, deleteStock, getMainStock, getAllStocksGroupByProductWise, getStockByRoute } = require('../controllers/sotckController');

router.post('/', checkToken, createStock).get('/', checkToken, getAllStocks).get('/main', checkToken, getMainStock).get('/all-sum', checkToken, getAllStocksGroupByProductWise);
router.get('/:id', checkToken, getStockById).delete('/:id', checkToken, deleteStock).patch('/:id', checkToken, updateStock);
router.get('/route/:routeId', checkToken, getStockByRoute)

module.exports = router;