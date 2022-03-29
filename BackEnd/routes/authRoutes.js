const { login, checkTokenByToken } = require("../controllers/authControllers");
const router = require("express").Router();
const { checkToken } = require("../middleware/auth");

router.post("/", login)
router.get('/token', checkTokenByToken)

module.exports = router;

