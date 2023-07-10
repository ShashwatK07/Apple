const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

router
  .route("/")
  .get(deviceController.allDevice)
  .post(deviceController.addDevice);

router.route("/:id").get(deviceController.getById).put(deviceController.edit);

module.exports = router;
