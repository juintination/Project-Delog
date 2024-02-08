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
    try {
      const user = await prisma.user.findFirst({
        where: { email: email },
      })

      if (!user) {
        return done(null, false, req.flash("loginMessage", "user not found"))
      }

      if (password === user.pwd) {
        return done(null, user)
      } else {
        return done(
          null,
          false,
          req.flash("loginMessage", "password incorrect")
        )
      }
    } catch (error) {
      return done(error)
    }
  }
)
