const router = require("express").Router();
const controller = require("../controllers/access-tokens.controller");

// router.get("/");
router.post("/", controller.createAccessToken);
// router.get("/:id");
// router.patch("/:id");
// router.delete("/:id");

module.exports = router;
