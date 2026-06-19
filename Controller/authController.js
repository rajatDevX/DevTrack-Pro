const User = require("../models/User");
const bcrypt = require("bcrypt");

const setFlash = (req, type, message) => {
  req.session.flash = { type, message };
};

exports.getRegister = (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.render("register");
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      setFlash(req, "error", "All fields are required.");
      return res.redirect("/register");
    }

    if (password.length < 6) {
      setFlash(req, "error", "Password must be at least 6 characters.");
      return res.redirect("/register");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      setFlash(req, "error", "An account with this email already exists.");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    setFlash(req, "success", "Account created. Please log in.");
    res.redirect("/login");
  } catch (error) {
    setFlash(req, "error", error.message);
    res.redirect("/register");
  }
};

exports.getLogin = (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.render("login");
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      setFlash(req, "error", "Invalid email or password.");
      return res.redirect("/login");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      setFlash(req, "error", "Invalid email or password.");
      return res.redirect("/login");
    }

    req.session.user = user;
    res.redirect("/dashboard");
  } catch (error) {
    setFlash(req, "error", error.message);
    res.redirect("/login");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
