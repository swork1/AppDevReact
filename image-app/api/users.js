// api/users.js
// api for users
// @author Seth Workman
// date : 2/11/20
// version: 1.0

const jwt = require("jwt-simple");
const router = require("express").Router();
const bcrypt = require("bcrypt-nodejs");
const SQL = require("../mySQLdb.js");

// For encoding/decoding JWT
const configuration = require("../configuration/configuration.json");
const secret = configuration.secret;

router.post("/user", (req, res) => {
  bcrypt.hash(req.body.password, null, null, function (err, hash) {
    //Creates user to be inserted
    var newuser = {
      uid: req.body.username,
      password: hash,
      full_name: req.body.lastName + "," + req.body.firstName,
      date_created: new Date(),
      admin: true,
    };

    //Insert user into SQL table
    SQL.query("INSERT INTO user SET ?", newuser, function (err, result) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.redirect("/login.html");
      }
    });
  });
});

router.post("/auth", (req, res) => {
  //Get user from the database
  SQL.query(
    "SELECT * FROM user WHERE uid = ?",
    [String(req.body.username)],
    function (err, user) {
      //START
      //Converts SQL Data to JSON for easier manipulation
      user = JSON.stringify(user);
      user = JSON.parse(user);
      user = user[0];
      //END of conversion

      if (err) throw err;

      if (!user) {
        //Username not in the database
        res.status(401).json({ error: "Bad username or password" });
      } else {
        //Does given password hash match the database password hash?
        bcrypt.compare(req.body.password, user.password, function (err, valid) {
          if (err) {
            res.status(400).json({ error: err });
          } else if (valid) {
            var token = jwt.encode({ uid: user.uid }, secret);
            res.send({ token: token });
          } else {
            res.status(401).json({ error: "Bad username or password" });
          }
        });
      }
    }
  );
});

router.get("/status", function (req, res) {
  // Check if the X-Auth header is set
  if (!req.headers["x-auth"]) {
    return res.status(401).json({ error: "Missing X-Auth header" });
  }

  // X-Auth should contain the token
  var token = req.headers["x-auth"];
  try {
    var decoded = jwt.decode(token, secret);

    SQL.query("SELECT uid FROM user", function (err) {
      res.json(decoded);
    });
  } catch (ex) {
    res.status(401).json({ error: "Invalid JWT" });
  }
});

module.exports = router;
