const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth");

const projectController = require("../Controller/projectController");

router.get("/dashboard", authMiddleware, projectController.getDashboard);

router.post("/project", authMiddleware, projectController.createProject);

router.post(
  "/project/delete/:id",
  authMiddleware,
  projectController.deleteProject,
);

router.post("/project/edit/:id", authMiddleware, projectController.editProject);

module.exports = router;
