const router = require("express").Router();
const controller = require("../controllers/contacts.controller");
const { requireFields } = require("../middleware/require-fields");

router.get("/", controller.searchContacts);
router.post("/", requireFields("displayName"), controller.createContact);
router.get("/:id", controller.getContactById);
router.patch("/:id", controller.updateContact);
router.delete("/:id", controller.deleteContact);

module.exports = router;
