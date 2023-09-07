require("dotenv").config();

const express = require("express");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");

const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: process.env.SECRET, saveUninitialized: true, resave: true })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.engine("ejs", engine);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("", customerRoutes);

app.get("*", (req, res) => {
  res.status(404).render("notfound", { title: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
