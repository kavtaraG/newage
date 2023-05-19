var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var dotenv = require('dotenv');

dotenv.config({path: './config.env'});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataApi = require('./routes/dataApi');

var app = express();

var sess = {
  name: 'session',
  secret: 'keyboard cat',
  resave: true,
  proxy: true,
  saveUninitialized: true,
  cookie: { cookieSession: true }
};

app.use(cookieSession(sess));

const mongo = () => {
  mongoose
    .connect( process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((data) => {
      //console.log(data);
    })
    .catch((err) => {
      if(err) throw err;
    })
};

const db = mongoose.connection;

db.once('open', () => {
  console.log('connect -> connected to database');
  app.locals = db;
});

db.on('error', (error) => {
  console.log('Database connection error::', error);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/data', dataApi);

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

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

//Client connection and temintation
const newServer = server;
newServer.on('connection', (socket) => {
  console.log(`client arrived ${new Date()}`);
  socket.on('end', () => {
    console.log(`Clinet left ${new Date()}`);
  });
});

newServer.setTimeout(2000, (data) => {
  data.end();
})

//error handling by event listener
server.listen(PORT, () => {
  console.log(`Listening to the port: ${PORT}`);
  process.on('uncaughtException', (data) => {
    console.log(`Process::${data}`);
  });
  mongo();
});

//server error handling
server.on('error', () => {
  try{
    process.on('exit' , () => {
      process.exit(0);
    })
  }catch(err){
    if(err) throw `Server error:: ${err}`;
  }; 
});



module.exports = app;
