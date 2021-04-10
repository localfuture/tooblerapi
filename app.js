require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var $ = require('jquery');

var homeRouter = require('./routes/home');
var mailSettingRouter = require('./routes/mailSettings');

var app = express();

//DataBase Connection//
(async () => {
  try {
    await mongoose.connect(process.env.DB_API, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
      .then(() => {
        console.log("Connected to DataBase");
      })
      .catch((error) => {
        console.log(error);
        console.log("Connection Failed!!!");
      });
    //await algo.logic();
  } catch (err) {
    console.log('error: ' + err)
  }
})()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/mail', mailSettingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
})

//module.exports = app;
