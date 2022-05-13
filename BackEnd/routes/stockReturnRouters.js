const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const {
    createStockReturn,
    setUpdateStatus
} = require('../controllers/stockReturnControllers');

router.post('/', checkToken, createStockReturn);
router.patch('/:id', checkToken, setUpdateStatus);

module.exports = router;