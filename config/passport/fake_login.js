var LocalStrategy = require('passport-local').Strategy;

/* 가상 데이터 */
let fakeUser = {
  username: 'test',
  password: '1234'
};

module.exports = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  console.log('passport의 local login 호출됨 : ' + username + ', ' + password);
  if (username === fakeUser.username) {
    if (password === fakeUser.password) {
      return done(null, fakeUser);
    } else {
      return done(null, false, req.flash('loginMessage', 'password incorrect'));
    }
  } else {
    return done(null, false, req.flash('loginMessage', 'username incorrect'));
  }
});