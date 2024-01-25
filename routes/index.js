module.exports = (app, passport) => {
  app.get("/", (req, res) => {
    if (!req.user) {
      res.render("index", { title: "Welcome page" })
    } else {
      const user = req.user
      res.render("user_page", { user: user })
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
}
