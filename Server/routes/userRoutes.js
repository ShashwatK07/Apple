const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/:id")
  .get(userController.userDetails)
  .post(userController.productsPurchased)
  .patch(userController.editPassword);

module.exports = router;

