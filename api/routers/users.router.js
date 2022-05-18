const router = require("express").Router();
const controller = require("../controllers/users.controller");
const { requireAuth, checkRole } = require("../middleware/auth");
const { requireFields } = require("../middleware/require-fields");

router.get("/", requireAuth, checkRole("ADMIN"), controller.searchUsers);

router.post(
    "/",
    requireFields(
        "givenName",
        "familyName",
        "email",
        "password",
        "confirmation"
    ),
    controller.createUser
);

router.get("/:id", controller.getUserById);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.get("/verify/:code", controller.verifyUser);

module.exports = router;
