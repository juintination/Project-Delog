var LocalStrategy = require("passport-local").Strategy

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

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
      const userProfile = await prisma.profile.create({
        data: { nickname: req.body.name },
      })
      req.body.birth = new Date(req.body.birth)
      req.body.profile_id = userProfile.id
      const createdUser = await prisma.user.create({
        data: req.body,
      })
      await prisma.category.create({
        data: { name: "전체", user_id: createdUser.id },
      })
      return done(null, user)
    } else {
      return done(null, false, req.flash("signupMessage", "password incorrect"))
    }
  }
)
