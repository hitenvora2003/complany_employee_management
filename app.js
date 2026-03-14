var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var department = require('./routes/department');
var employee = require('./routes/employee');
var signup = require('./routes/signup');
var project = require('./routes/project');
var task = require('./routes/task');
var Leave = require('./routes/Leave');
var timesheet = require('./routes/timesheet');
var getalldata = require('./routes/getalldata');


const mongoose = require('mongoose');
// const { error } = require('console');
mongoose.connect('mongodb://localhost:27017/populate')
.then(()=>{
  console.log('mongoDB connect successfully');
  
})
.catch((error)=>{
   console.log(error);
   
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/employee', employee);
app.use('/signup',signup)
app.use('/department',department)
app.use('/project',project)
app.use('/task',task)
app.use('/leave',Leave)
app.use('/timesheet',timesheet)
app.use('/alldata',getalldata)

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

module.exports = app;
