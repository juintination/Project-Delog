const express = require("express")
const router = express.Router()

const {
  getAllComments,
  getCommentsByIds,
  getCommentByCommentId,
  createComment,
  updateComment,
  deleteComment,
} = require("../services/comment-service")

// 전체 댓글 조회(READ)
router.get("/all/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const categories = await getAllComments(userId)
    res.status(200).json(categories)
  } catch (err) {
    console.error("Error in getAllComments route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get all categories")
  }
})

// 특정 게시글에 대한 댓글 조회(READ)
router.get("/all/:userId/:postId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const postId = parseInt(req.params.postId)
    const comment = await getCommentsByIds(userId, postId)
    res.status(200).json(comment)
  } catch (err) {
    console.error("Error in getCommentsByIds route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get comments by userId and postId")
  }
})

// 특정 댓글 조회(READ)
router.get("/:commentId", async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const comment = await getCommentByCommentId(commentId)
    res.status(200).json(comment)
  } catch (err) {
    console.error("Error in getCommentByCommentId route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get comment by commentId")
  }
})

// 새로운 댓글 추가(CREATE)
router.post("/create", async (req, res) => {
  try {
    const commentData = req.body
    const comment = await createComment(commentData)
    res.status(200).json(comment)
  } catch (err) {
    console.error("Error in createCommentByData route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to create comment")
  }
})

// 댓글 수정(UPDATE)
router.put("/update/:commentId", async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const commentData = req.body
    const updatedcomment = await updateComment(commentId, commentData)
    res.status(200).json(updatedcomment)
  } catch (err) {
    console.error("Error in updateCommentById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to update comment")
  }
})

// 댓글 삭제(DELETE)
router.delete("/delete/:commentId", async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId)
    await deleteComment(commentId)
    res.status(204).end()
  } catch (err) {
    console.error("Error in deleteCommentById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to delete comment")
  }
})

module.exports = router
