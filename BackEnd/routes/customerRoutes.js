const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

const { createCustomer, getCustomer, updateCustomer } = require("../controllers/customerControllers");

router.post('/', checkToken, createCustomer).get('/', checkToken, getCustomer);
router.patch('/:id', checkToken, updateCustomer)

module.exports = router