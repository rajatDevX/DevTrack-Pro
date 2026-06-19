require("dotenv").config();

const express = require("express");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const connectDB = require("./config/db");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

const startServer = async () => {
  try {
    await connectDB();

    app.use(
      session({
        secret: process.env.SESSION_SECRET || "devtracksecret",

        resave: false,

        saveUninitialized: false,

        cookie: {
          httpOnly: true,
          sameSite: "lax",
          secure: isProduction,
        },

        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
        }),
      }),
    );

    app.use(require("./middleware/flash"));

    app.use("/", require("./routes/authRoutes"));

    app.use("/", require("./routes/projectRoutes"));

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
