const { createRoute, getAllRoutes, getRouteById, deleteRouteById, updateRoute } = require("../controllers/routeControllers");

const router = require("express").Router();
const { checkToken } = require("../middleware/auth")

router.post("/", checkToken, createRoute).get("/", checkToken, getAllRoutes);
router.get("/:id", checkToken, getRouteById).delete("/:id", checkToken, deleteRouteById).patch("/:id", checkToken, updateRoute);

module.exports = router;
