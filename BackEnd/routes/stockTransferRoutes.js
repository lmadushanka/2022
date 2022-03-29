const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const { createStockTransfer, getStockTransferById, getAllTransfer, getStockAmountByStockTransfer, updateStockTransfer } = require("../controllers/stockTransferControllers");

router.post('/', checkToken, createStockTransfer).get('/', checkToken, getAllTransfer).get('/:routeId/:productId', checkToken, getStockAmountByStockTransfer);
router.get('/:id', checkToken, getStockTransferById).patch('/:id', checkToken, updateStockTransfer);

module.exports = router;