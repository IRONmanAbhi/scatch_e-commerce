const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { execPath } = require("process");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.listen(3000);
