const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const {
    addWastageStock,
    getAllWastageStocks,
    getWastageStockById,
    updateQtyById
} = require('../controllers/wastageStockController');

router.post('/', checkToken, addWastageStock);
router.get('/', checkToken, getAllWastageStocks);
router.get('/:id', checkToken, getWastageStockById);
router.patch('/qty/:id', checkToken, updateQtyById);

module.exports = router;