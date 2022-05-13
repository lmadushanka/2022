const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const {
    createStock,
    getAllStocks,
    getStockById,
    getStockByProductId,
    getStockQtySumById,
    updateQtyById,
    updateRecievedById,
    setRejectStock,
    deleteStock,
    getStockAmountGroupByProductId
} = require('../controllers/sotckController');

router.post('/', checkToken, createStock);
router.get('/', checkToken, getAllStocks);
router.get('/stock-amount-group-by-product', checkToken, getStockAmountGroupByProductId);
router.get('/qty-sum/:id', checkToken, getStockQtySumById);
router.get('/product-wise/:productId', checkToken, getStockByProductId);
router.get('/:id', checkToken, getStockById);
router.patch('/qty/:id', checkToken, updateQtyById);
router.patch('/recieved/:id', checkToken, updateRecievedById);
router.patch('/reject/:id', checkToken, setRejectStock);
router.patch('/delete/:id', checkToken, deleteStock);

module.exports = router;