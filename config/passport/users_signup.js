var LocalStrategy = require("passport-local").Strategy
const axios = require("axios")

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const user = req.body
    if (user.password === user.confirmPassword) {
      req.body.pwd = user.password
      delete req.body.password
      delete req.body.confirmPassword
      await axios({
        method: "post",
        url: `http://localhost:8080/user/create`,
        data: req.body,
      })
      https: return done(null, user)
    } else {
      return done(null, false, req.flash("signupMessage", "password incorrect"))
    }
  }
)
