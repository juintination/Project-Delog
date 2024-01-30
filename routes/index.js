const multer = require("multer")
const path = require("path")
const fs = require("fs")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// 파일 저장 경로와 파일 이름 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/") // 업로드된 파일이 저장될 디렉터리 설정
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // 파일 이름 설정 (중복 방지)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
})

module.exports = (app, passport) => {
  app.get("/", async (req, res) => {
    if (!req.user) {
      res.render("index", { title: "Welcome page" })
    } else {
      const user = req.user
      res.redirect(`/delog/${user.id}`)
    }
  })

  // user page
  app.get("/delog/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId)
    var isOwner = false
    if (req.user) {
      if (req.user.id === userId) {
        isOwner = true
      }
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })

    const profile = await prisma.profile.findUnique({
      where: { id: user.profile_id },
    })

    const categories = await prisma.category.findMany({
      where: { user_id: userId },
    })

    var posts = []
    await Promise.all(
      categories.map(async (category) => {
        const response = await prisma.post.findMany({
          where: { category_id: category.id },
        })
        if (response.length) {
          response.forEach((post) => {
            posts.push(post)
          })
        }
      })
    )

    res.render("user_page", {
      user: user,
      profile: profile,
      categories: categories,
      posts: posts,
      isOwner: isOwner,
    })
  })

  // get post
  app.get("/get_post/:profileId/:categoryId/:postId", async (req, res) => {
    const profileId = parseInt(req.params.profileId)

    var isOwner = false
    var visitor = null
    if (req.user) {
      visitor = req.user
      if (visitor.profile_id === profileId) {
        isOwner = true
      }
    }

    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
    })

    const categoryId = parseInt(req.params.categoryId)
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    const postId = parseInt(req.params.postId)
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    const comments = await prisma.comment.findMany({
      where: { post_id: postId },
    })

    if (comments) {
      await Promise.all(
        comments.map(async (comment) => {
          const author = await prisma.user.findUnique({
            where: { id: comment.user_id },
          })

          const profile = await prisma.profile.findUnique({
            where: { id: author.profile_id },
          })
          comment.author = profile.nickname
        })
      )
    }

    res.render("get_post", {
      profile: profile,
      category: category,
      post: post,
      comments: comments,
      isOwner: isOwner,
      visitor: visitor,
    })
  })

  // get category
  app.get("/get_category/:categoryId", async (req, res) => {
    const categoryId = parseInt(req.params.categoryId)
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    const user = await prisma.user.findUnique({
      where: { id: category.user_id },
    })

    var isOwner = false
    if (req.user) {
      if (req.user.id === user.id) {
        isOwner = true
      }
    }

    const profile = await prisma.profile.findUnique({
      where: { id: user.profile_id },
    })

    const posts = await prisma.post.findMany({
      where: { category_id: categoryId },
    })

    res.render("get_category", {
      profile: profile,
      category: category,
      posts: posts,
      isOwner: isOwner,
    })
  })

  // create post
  app.post("/create_post", async (req, res) => {
    const categoryId = parseInt(req.body.categoryId)
    res.render("create_post", { categoryId: categoryId })
  })

  // edit post
  app.post("/edit_post", async (req, res) => {
    const postId = parseInt(req.body.postId)
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })
    res.render("edit_post", { post: post })
  })

  // add comment
  app.post("/add_comment", async (req, res) => {
    const commentData = {
      user_id: parseInt(req.user.id),
      post_id: parseInt(req.body.postId),
      content: req.body.content,
      is_secret: req.body.isSecret === "1" ? true : false,
    }
    await prisma.comment.create({
      data: commentData,
    })

    const profileId = parseInt(req.user.profile_id)
    const categoryId = parseInt(req.body.categoryId)
    res.redirect(`/get_post/${profileId}/${categoryId}/${commentData.post_id}`)
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
    const profile = await prisma.profile.findUnique({
      where: { id: user.profile_id },
    })
    res.render("update_profile", { user: user, profile: profile })
  })

  app.post("/update_profile", upload.single("pic"), async (req, res) => {
    const updatedProfile = req.body
    const updatedProfileId = parseInt(updatedProfile.id)

    let picBase64 = null
    if (req.file) {
      // 이미지 파일을 읽어와서 base64로 인코딩
      const picData = fs.readFileSync(req.file.path)
      picBase64 = Buffer.from(picData).toString("base64")

      await prisma.profile.update({
        where: { id: updatedProfileId },
        data: {
          nickname: updatedProfile.nickname,
          pic: picBase64,
          bio: updatedProfile.bio,
        },
      })
    } else {
      await prisma.profile.update({
        where: { id: updatedProfileId },
        data: {
          nickname: updatedProfile.nickname,
          bio: updatedProfile.bio,
        },
      })
    }
    res.redirect("/")
  })

  // withdrawal
  app.get("/withdrawal", async (req, res) => {
    req.session.destroy()
    const user = req.user
    await prisma.comment.deleteMany({
      where: { user_id: user.id },
    })
    await prisma.category.deleteMany({
      where: { user_id: user.id },
    })
    await prisma.profile.delete({
      where: { id: user.profile_id },
    })
    await prisma.user.delete({
      where: { id: user.id },
    })
    res.redirect("/")
  })
}
