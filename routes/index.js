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
    res.render("login")
  })

  // register for login
  app.post(
    "/register",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  )

  // logout
  app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
  })
}
