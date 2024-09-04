const express = require("express");
const contactController = require("../controller/contactController");

const router = express.Router();

router
    .route("/")
    .post(contactController.createContact)
    .get(contactController.getAllContacts);

router
    .route("/:id")
    .get(contactController.getContact)
    .patch(contactController.updateContact)
    .delete(contactController.deleteContact);

module.exports = router;
