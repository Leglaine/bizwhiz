const router = require("express").Router();
const controller = require("../controllers/users.controller");
const { requireAuth, checkRole } = require("../middleware/auth");
const { requireFields } = require("../middleware/require-fields");

// Search users - ADMIN ONLY
router.get("/", requireAuth, checkRole("ADMIN"), controller.searchUsers);

// Create user - PUBLIC
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

// Get user by id - PROTECTED
router.get("/:id", requireAuth, controller.getUserById);

// Update user - PROTECTED
router.patch("/:id", controller.updateUser);

// Delete user - PROTECTED
router.delete("/:id", requireAuth, controller.deleteUser);

// Verify email - PUBLIC
router.get("/verify/:code", controller.verifyUser);

// Reset password - PUBLIC
router.post("/reset-password", controller.resetPassword);

module.exports = router;
