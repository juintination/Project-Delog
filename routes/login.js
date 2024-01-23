const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;

router.use(express.json());
router.use(express.urlencoded({ extended: true })); // POST 데이터 파싱

router.use(cookieParser('passport-delog'));
router.use(session({
  secret: 'passport-delog',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

/* 가상 데이터 */
let fakeUser = {
  username: 'test',
  password: '1234'
};

/* passport 미들웨어 */
router.use(passport.initialize());
router.use(passport.session());

// 세션 처리 - 로그인에 성공했을 경우 딱 한번 호출되어 사용자의 식별자를 session에 저장
passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user.username);
});

// 세션 처리 - 로그인 후 페이지 방문마다 사용자의 실제 데이터 주입
passport.deserializeUser((id, done) => {
  console.log('deserializeUser', id);
  done(null, fakeUser);
});

// passport-local Strategy 사용
passport.use(new Localstrategy((username, password, done) => {
    if (username === fakeUser.username) {
      if (password === fakeUser.password) {
        return done(null, fakeUser);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    } else {
      return done(null, false, { message: "username incorrect" });
    }
  }
));

// login
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/register', passport.authenticate('local', { failureRedirect: '/'}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
