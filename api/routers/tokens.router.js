const router = require("express").Router();
const controller = require("../controllers/tokens.controller");

// router.get("/");
router.post("/", controller.createTokens);
// router.get("/:id");
// router.patch("/:id");
// router.delete("/:id");

module.exports = router;
