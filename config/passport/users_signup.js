var LocalStrategy = require("passport-local").Strategy

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Joi = require("joi")

// Joi 스키마 정의
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  name: Joi.string().required(),
  birth: Joi.date().required(),
})

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      // 요청 데이터 검증
      const { error, value } = schema.validate(req.body)
      if (error) {
        return done(null, false, req.flash("signupMessage", error.message))
      }

      const user = value

      if (user.password !== user.confirmPassword) {
        return done(
          null,
          false,
          req.flash("signupMessage", "Passwords do not match")
        )
      }
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
    } catch (err) {
      return done(err)
    }
  }
)
