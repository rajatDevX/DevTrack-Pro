const Project = require("../models/Project");

exports.getDashboard = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.session.user._id,
    }).sort({ createdAt: -1 });

    const stats = {
      total: projects.length,
      planned: projects.filter((project) => project.status === "Planned").length,
      inProgress: projects.filter((project) => project.status === "In Progress")
        .length,
      completed: projects.filter((project) => project.status === "Completed")
        .length,
      highPriority: projects.filter((project) => project.priority === "High")
        .length,
    };

    res.render("dashboard", { projects, stats });
  } catch (err) {
    res.send(err.message);
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

    res.redirect("/dashboard");
  } catch (err) {
    res.send(err.message);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.session.user._id,
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.send(err.message);
  }
};

exports.editProject = async (req, res) => {
  try {
    await Project.findOneAndUpdate(
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

    res.redirect("/dashboard");
  } catch (err) {
    res.send(err.message);
  }
};
