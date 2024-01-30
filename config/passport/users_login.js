const LocalStrategy = require("passport-local").Strategy

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const user = await prisma.user.findFirst({
      where: { email: email },
    })

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
