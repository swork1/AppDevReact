// Seth Workman
// 2/4/20
// API to get and post images
//

const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const mkdirp = require("mkdirp");
const jwt = require("jwt-simple");
var thumb = require("node-thumbnail").thumb;
const SQL = require("../mySQLdb.js");

// For encoding/decoding JWT
const configuration = require("../configuration/configuration.json");
const secret = configuration.secret;
var pathName;
var dir;

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var token = jwt.encode({ uid: req.body.username }, secret);
    //gets 65th - 75th characters of token for file name
    var shortToken = token.substring(65, 75);
    //pass pathName to Database for pulling images down
    pathName = shortToken;
    //dir for image, based off user
    dir = "public/images/" + shortToken;
    //creates dir if doesn't exist using mkdirp
    mkdirp.sync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// set upload object to store pictures to correct location
var upload = multer({ storage: storage });

// Get list of all images in the database
router.get("/", function (req, res) {
  SQL.query("SELECT * FROM image", function (err, images) {
    if (err) {
      res.status(400).send(err);
    } else {
      images = JSON.stringify(images);
      images = JSON.parse(images);
      res.json(images);
    }
  });
});

/// Add a new image to the database
router.post("/", upload.single("photo"), (req, res) => {
  // log the file upload to console
  if (req.file) {
    console.log("File: " + req.body.photoName + " saved on.");
  } else throw "error";

  // make a new Image object from the input data
  var img = {
    filename: req.file.filename,
    photo_name: req.body.photoName,
    album: req.body.album,
    upload_date: new Date(),
    description: req.body.description,
    camera: req.body.camera,
    fstop: req.body.fstop,
    sspeed: req.body.sspeed,
    iso: req.body.iso,
    focal_length: req.body.focal_length,
    owner: req.body.username,
    path: pathName,
  };

  // save the image to the database
  SQL.query("INSERT INTO image SET ?", img, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      //Make a thumbnail version of the uploading image
      thumb({
        source: dir + "/" + img.filename,
        destination: dir,
        width: 200,
        skip: true,
      })
        .then(function () {
          console.log("Success");
        })
        .catch(function (e) {
          console.log("Error", e.toString());
        });

      res.redirect("/#/home");
    }
  });
});

module.exports = router;
