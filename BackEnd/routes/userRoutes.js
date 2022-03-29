const { createUser, getAllUser, getOneUser, updateUserById, deleteUserById } = require("../controllers/userControllers");
const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

router.post("/", checkToken, createUser).get("/", checkToken, getAllUser).patch("/:id", checkToken, updateUserById);
router.get("/:id", checkToken, getOneUser);
router.delete('/:id', checkToken, deleteUserById);

module.exports = router;