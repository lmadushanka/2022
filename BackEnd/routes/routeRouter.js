const { createRoute, getAllRoutes, getRouteById, deleteRouteById, updateRoute } = require("../controllers/routeControllers");

const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

router.post("/", checkToken, createRoute)
router.get("/", checkToken, getAllRoutes);
router.get("/:id", checkToken, getRouteById)
router.delete("/:id", checkToken, deleteRouteById)
router.patch("/:id", checkToken, updateRoute);

module.exports = router;
