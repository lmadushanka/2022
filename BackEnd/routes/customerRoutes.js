const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const { createCustomer, getCustomer, updateCustomer, getCustomerById, deleteCustomerById, getCustomerCount } = require("../controllers/customerControllers");

router.get('/customerCount', checkToken, getCustomerCount);
router.post('/', checkToken, createCustomer)
router.get('/', checkToken, getCustomer)
router.get('/:id', checkToken, getCustomerById);
router.patch('/:id', checkToken, updateCustomer)
router.patch('/delete/:id', checkToken, deleteCustomerById);

module.exports = router