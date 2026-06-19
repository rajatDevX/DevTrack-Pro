require("dotenv").config();

const express = require("express");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const connectDB = require("./config/db");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

connectDB();

app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

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

app.use("/", require("./routes/authRoutes"));

app.use("/", require("./routes/projectRoutes"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running");
});
