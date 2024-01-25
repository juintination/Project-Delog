var LocalStrategy = require("passport-local").Strategy

/* 가상 데이터 */
let fakeUser = {
  name: "fakeUser",
  email: "test",
  password: "1234",
}

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    console.log("passport의 local login 호출됨 : " + email + ", " + password)
    if (email === fakeUser.email) {
      if (password === fakeUser.password) {
        return done(null, fakeUser)
      } else {
        return done(
          null,
          false,
          req.flash("loginMessage", "password incorrect")
        )
      }
    } else {
      return done(null, false, req.flash("loginMessage", "username incorrect"))
    }
  }
)
