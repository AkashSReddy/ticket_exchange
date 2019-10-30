var express = require('express');
var router = express.Router();
var passport = require("passport");
const Train = require("../models/train");
var userService = require("../services/userservice");
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({ message: "index page" })
});

router.get("/login", (req, res, next) => {
  res.json({ message: "pls login" })
})

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/users",
    failureRedirect: "/",
    failureFlash: true
  })
);

router.post("/register", async (req, res, next) => {
  try {
    var message = await userService.addUser(req.body);
    console.log("message :" + message)
    if (message === "ok") return res.redirect("/login");
    return res.json({ message: message });
  } catch (error) {
    next(error)
  }
})

// router.post("/add", async (req, res, next) => {
//   try {
//     let det = new Train();
//     det.trainid = req.body.trainid;
//     det.trainName = req.body.trainname;
//     det.seat1 = req.body.seat1;
//     det.seat2 = req.body.seat2;
//     det.seat3 = req.body.seat3;
//     await det.save();
//   } catch (error) {
//     next(error);
//   }
// })

module.exports = router;
