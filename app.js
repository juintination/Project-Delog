const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;

const app = express();
app.set('port', process.env.PORT || 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // POST 데이터 파싱

app.use(logger('dev'));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const logoutRouter = require('./routes/logout');
app.use('/logout', logoutRouter);

const userRouter = require('./routes/users');
app.use('/user', userRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

/* 404 오류 처리 */
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 해당 주소가 없습니다.`)
  error.status = 404;
  next(error);
});

/* 오류 처리 미들웨어 */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error Occurred');
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
