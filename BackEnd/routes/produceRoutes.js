const {
    createProduct, getAllProducts, getProductByProductCode, updateProductById, deleteProductById
} = require("../controllers/productControllers");

const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

router.post("/", checkToken, createProduct).get("/", checkToken, getAllProducts);
router.get("/:productCode", checkToken, getProductByProductCode).delete("/:id", checkToken, deleteProductById);
router.patch("/:id", checkToken, updateProductById);

module.exports = router;
