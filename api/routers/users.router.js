const router = require("express").Router();
const controller = require("../controllers/users.controller");
const { requireAuth } = require("../middleware/require-auth");

router.get("/", requireAuth, controller.searchUsers);
router.post("/", controller.createUser);
router.get("/:id", controller.getUserById);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.get("/verify/:code", controller.verifyUser);

module.exports = router;
