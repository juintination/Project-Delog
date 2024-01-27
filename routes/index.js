const axios = require("axios")

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

  app.post("/update_profile", async (req, res) => {
    const updatedProfile = req.body
    await axios.put(
      `http://localhost:8080/profile/update/${updatedProfile.id}`,
      {
        nickname: updatedProfile.nickname,
        bio: updatedProfile.bio,
      }
    )
    res.redirect("/")
  })
}
