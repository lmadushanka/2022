const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const { createStock, getAllStocks, getStockById, updateStock, deleteStock, getMainStock } = require('../controllers/sotckController');

router.post('/', checkToken, createStock).get('/', checkToken, getAllStocks).get('/main', checkToken, getMainStock);
router.get('/:id', checkToken, getStockById).delete('/:id', checkToken, deleteStock).patch('/:id', checkToken, updateStock);

module.exports = router;