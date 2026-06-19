const express = require("express");

const router = express.Router();

const authController = require("../Controller/authController");

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", authController.logout);

module.exports = router;
