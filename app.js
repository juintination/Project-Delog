const express = require("express")
const http = require("http")
const path = require("path")
require("dotenv").config()
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")
const flash = require("connect-flash")

const app = express()
app.set("port", process.env.PORT || 8080)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true })) // POST 데이터 파싱

const passportSecretKey = process.env.PASSPORT_SECRET
app.use(cookieParser(passportSecretKey))
app.use(
  session({
    secret: passportSecretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
)

/* passport 미들웨어 */
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(logger("dev"))

const configPassport = require("./config/passport")
configPassport(app, passport)

var userPassport = require("./routes/index")
userPassport(app, passport)

const userRouter = require("./routes/users")
app.use("/user", userRouter)

const profileRouter = require("./routes/profiles")
app.use("/profile", profileRouter)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(express.static(__dirname + "/public"))

/* 404 오류 처리 */
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 해당 주소가 없습니다.`)
  error.status = 404
  next(error)
})

/* 오류 처리 미들웨어 */
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== "development" ? err : {}
  res.status(err.status || 500)
  res.send("error Occurred")
})

http.createServer(app).listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"))
})
