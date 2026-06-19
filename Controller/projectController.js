const Project = require("../models/Project");

const setFlash = (req, type, message) => {
  req.session.flash = { type, message };
};

exports.getDashboard = async (req, res) => {
  try {
    const { q = "", status = "", priority = "" } = req.query;

    const query = {
      owner: req.session.user._id,
    };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (q.trim()) {
      const search = q.trim();
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const allProjects = await Project.find({
      owner: req.session.user._id,
    });

    const projects = await Project.find(query).sort({ createdAt: -1 });

    const now = new Date();
    const threeDaysFromNow = new Date(now);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    const stats = {
      total: allProjects.length,
      planned: allProjects.filter((project) => project.status === "Planned")
        .length,
      inProgress: allProjects.filter(
        (project) => project.status === "In Progress",
      ).length,
      completed: allProjects.filter(
        (project) => project.status === "Completed",
      ).length,
      highPriority: allProjects.filter((project) => project.priority === "High")
        .length,
      overdue: allProjects.filter(
        (project) =>
          project.dueDate &&
          project.status !== "Completed" &&
          project.dueDate < now,
      ).length,
    };

    res.render("dashboard", {
      projects,
      stats,
      filters: { q, status, priority },
      user: req.session.user,
      now,
      threeDaysFromNow,
    });
  } catch (err) {
    setFlash(req, "error", err.message);
    res.redirect("/dashboard");
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    await Project.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      owner: req.session.user._id,
    });

    setFlash(req, "success", "Project created successfully.");
    res.redirect("/dashboard");
  } catch (err) {
    setFlash(req, "error", err.message);
    res.redirect("/dashboard");
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.session.user._id,
    });

    if (!deleted) {
      setFlash(req, "error", "Project not found.");
      return res.redirect("/dashboard");
    }

    setFlash(req, "success", "Project deleted.");
    res.redirect("/dashboard");
  } catch (err) {
    setFlash(req, "error", err.message);
    res.redirect("/dashboard");
  }
};

exports.editProject = async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.session.user._id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate || null,
      },
      {
        runValidators: true,
      },
    );

    if (!updated) {
      setFlash(req, "error", "Project not found.");
      return res.redirect("/dashboard");
    }

    setFlash(req, "success", "Project updated.");
    res.redirect("/dashboard");
  } catch (err) {
    setFlash(req, "error", err.message);
    res.redirect("/dashboard");
  }
};

exports.quickUpdateStatus = async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.session.user._id,
      },
      { status: req.body.status },
      { runValidators: true },
    );

    if (!updated) {
      setFlash(req, "error", "Project not found.");
      return res.redirect("/dashboard");
    }

    setFlash(req, "success", "Status updated.");
    res.redirect("/dashboard");
  } catch (err) {
    setFlash(req, "error", err.message);
    res.redirect("/dashboard");
  }
};
