const router = require("express").Router();
const { checkToken } = require("../middleware/auth");

const {
    addStockTransfer,
    getAllStockTransfer,
    updateStockTransfer,
    getStockTransferById,
    getStockTransferByProductIdAndRouteId,
    getStockTransferQtySumGroupByProductId
} = require('../controllers/stockTransferControllers');

router.post('/', checkToken, addStockTransfer);
router.get('/', checkToken, getAllStockTransfer);
router.get('/route-by/:routeId', checkToken, getStockTransferQtySumGroupByProductId);
router.get('/:id', checkToken, getStockTransferById);
router.get('/:productId/:routeId', checkToken, getStockTransferByProductIdAndRouteId);
router.patch('/:id', checkToken, updateStockTransfer);

module.exports = router;