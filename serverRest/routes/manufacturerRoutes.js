const express = require("express");
const manufacturerController = require("../controller/manufacturerController");

const router = express.Router();

router
    .route("/")
    .post(manufacturerController.createManufacturer)
    .get(manufacturerController.getAllManufacturers);

router
    .route("/:id")
    .get(manufacturerController.getManufacturer)
    .patch(manufacturerController.updateManufacturer)
    .delete(manufacturerController.deleteManufacturer);

module.exports = router;
