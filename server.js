var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var jwt = require("express-jwt");
jsonwebtoken = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

app.get("/bears", async function(req, res) {
  const result = await jsonwebtoken.sign(
    { userId: "klareneger" },
    "shhhhhhared-secret"
  );
  res.json({ result });
});

app.get(
  "/protected",
  jwt({ secret: "shhhhhhared-secret", credentialsRequired: false }),
  function(req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);

app.use(function(req, res, next) {
  console.log("Something is happening.");
  console.log(req);
  next();
});

app.listen(port);

console.log("todo list RESTful API server started on: " + port);
