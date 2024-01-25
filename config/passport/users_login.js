const LocalStrategy = require("passport-local").Strategy
const axios = require("axios")

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    // HTTP 요청을 통해 사용자 정보를 얻어옴
    const response = await axios.get(`http://localhost:8080/user/${email}`)

    // 응답에서 필요한 정보를 추출
    const user = response.data

    if (email === user.email) {
      if (password === user.pwd) {
        return done(null, user)
      } else {
        return done(
          null,
          false,
          req.flash("loginMessage", "password incorrect")
        )
      }
    } else {
      return done(null, false, req.flash("loginMessage", "email incorrect"))
    }
  }
)
