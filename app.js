var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("cookie-session");
const bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var passport = require("passport")
const flash = require("connect-flash");
var mongoose = require("mongoose")
const localstrategy = require("passport-local");
var usersRouter = require('./routes/users');

var app = express();
mongoose.connect(
  "mongodb://localhost/train",
  { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
);


const auth = require("./middleware/authentication");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const keys = ["Ron", "Swanson"];
const expiryDate = new Date(5 * Date.now() + 60 * 60 * 1000); // 5 hours
// console.log(expiryDate);
app.use(
  session({
    secret: "mustache",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
      expires: expiryDate
    },
    keys: keys
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.all("/users*", auth.isLoggedIn)
app.use('/users', usersRouter);
require("./config/passport")(passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
