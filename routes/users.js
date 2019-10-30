var express = require('express');
var router = express.Router();
var userService = require("../services/userservice");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ message: "Login success" })
});

router.get('/test', function (req, res, next) {
  res.json({ message: "test success" })
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.json({ message: "logout success" })
});

router.get("/details", async (req, res, next) => {
  try {
    let det = await userService.getDetails();
    res.json(det)
  } catch (error) {
    next(error);
  }
})
module.exports = router;
