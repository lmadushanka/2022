const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const { createCustomer, getCustomer, updateCustomer, getCustomerById, deleteCustomerById } = require("../controllers/customerControllers");

router.post('/', checkToken, createCustomer).get('/', checkToken, getCustomer).get('/:id', checkToken, getCustomerById);
router.patch('/:id', checkToken, updateCustomer).patch('/delete/:id', checkToken, deleteCustomerById);

module.exports = router