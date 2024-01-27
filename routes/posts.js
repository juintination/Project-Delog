const express = require("express")
const router = express.Router()

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../services/post-service")

// 전체 게시글 조회(READ)
router.get("/all/:categoryId", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId)
    const posts = await getAllPosts(categoryId)
    res.status(200).json(posts)
  } catch (err) {
    console.error("Error in getAllPosts route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get all posts")
  }
})

// 특정 게시글 조회(READ)
router.get("/:postId", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const post = await getPostById(postId)
    res.status(200).json(post)
  } catch (err) {
    console.error("Error in getPostById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get post by postId")
  }
})

// 새로운 게시글 추가(CREATE)
router.post("/create", async (req, res) => {
  try {
    const postData = req.body
    const post = await createPost(postData)
    res.status(200).json(post)
  } catch (err) {
    console.error("Error in createPostByData route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to create post")
  }
})

// 게시글 수정(UPDATE)
router.put("/update/:postId", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const postData = req.body
    const updatedpost = await updatePost(postId, postData)
    res.status(200).json(updatedpost)
  } catch (err) {
    console.error("Error in updatePostById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to update post")
  }
})

// 게시글 삭제(DELETE)
router.delete("/delete/:postId", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    await deletePost(postId)
    res.status(204).end()
  } catch (err) {
    console.error("Error in deletePostById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to delete post")
  }
})

module.exports = router
