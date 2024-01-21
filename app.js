const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use(express.json());

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

/* /user로 시작하는 모든 경로의 요청에 대해 실행되는 사용자 라우터 설정 */
const userRouter = require('./routes/users');
app.use('/user', userRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
