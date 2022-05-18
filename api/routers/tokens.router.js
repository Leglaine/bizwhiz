const router = require("express").Router();
const controller = require("../controllers/tokens.controller");
const { requireFields } = require("../middleware/require-fields");

router.post("/", requireFields("email", "password"), controller.createTokens);
router.patch("/", controller.updateAccessToken);
router.delete("/", controller.deleteRefreshToken);

module.exports = router;
