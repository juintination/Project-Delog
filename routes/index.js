const axios = require("axios")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

// 파일 저장 경로와 파일 이름 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/") // 업로드된 파일이 저장될 디렉터리 설정
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // 파일 이름 설정 (중복 방지)
  },
})

// Multer 설정
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 최대 파일 크기 설정 (예: 10MB)
})

module.exports = (app, passport) => {
  app.get("/", async (req, res) => {
    if (!req.user) {
      res.render("index", { title: "Welcome page" })
    } else {
      const user = req.user
      const profile = await axios.get(
        `http://localhost:8080/profile/${user.profile_id}`
      )
      res.render("user_page", { user: user, profile: profile.data })
    }
  })

  // login
  app.get("/login", (req, res) => {
    res.render("login", {
      message: req.flash("loginMessage"),
    })
  })

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  )

  // signup
  app.get("/signup", (req, res) => {
    res.render("signup", {
      message: req.flash("signupMessage"),
    })
  })

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/login",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  )

  // logout
  app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
  })

  // update profile
  app.get("/update_profile", async (req, res) => {
    const user = req.user
    const profile = await axios.get(
      `http://localhost:8080/profile/${user.profile_id}`
    )
    res.render("update_profile", { user: user, profile: profile.data })
  })

  app.post("/update_profile", upload.single("pic"), async (req, res) => {
    const updatedProfile = req.body
    console.log(req.file)

    let picBase64 = null
    if (req.file) {
      // 이미지 파일을 읽어와서 base64로 인코딩
      const picData = fs.readFileSync(req.file.path)
      picBase64 = Buffer.from(picData).toString("base64")
    }

    try {
      // 업로드된 파일의 경로와 함께 프로필 정보를 서버에 전송
      await axios.put(
        `http://localhost:8080/profile/update/${updatedProfile.id}`,
        {
          nickname: updatedProfile.nickname,
          bio: updatedProfile.bio,
          pic: picBase64, // 업로드된 파일의 경로를 서버에 전달
        }
      )

      res.redirect("/")
    } catch (error) {
      console.error("Error updating profile:", error)
      res.status(500).send("Internal Server Error")
    }
  })
}
