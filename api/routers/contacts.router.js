const router = require("express").Router();
const controller = require("../controllers/contacts.controller");

router.get("/", controller.searchContacts);
router.post("/", controller.createContact);
router.get("/:id", controller.getContactById);
router.patch("/:id", controller.updateContact);
router.delete("/:id", controller.deleteContact);

module.exports = router;
