var fakeLogin = require('./passport/fake_login');

module.exports = (app, passport) => {
  // 세션 처리 - 로그인에 성공했을 경우 딱 한번 호출되어 사용자의 식별자를 session에 저장
  passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user.username);
  });

  // 세션 처리 - 로그인 후 페이지 방문마다 사용자의 실제 데이터 주입
  passport.deserializeUser((user, done) => {
    console.log('deserializeUser', user);
    done(null, user);
  });

  // 인증 방식
  passport.use('local', fakeLogin);
};