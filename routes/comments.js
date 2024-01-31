/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: 댓글 CRUD
 */

const express = require("express")
const router = express.Router()

const {
  getAllUsersComments,
  getAllPostsComments,
  getCommentsByIds,
  getCommentByCommentId,
  createComment,
  updateComment,
  deleteComment,
} = require("../services/comment-service")

/**
 * @swagger
 * paths:
 *  /comment/all/user/{userId}:
 *    get:
 *      summary: 유저의 모든 댓글 조회
 *      tags: [Comments]
 *      description: 특정 유저가 작성한 모든 댓글을 조회합니다.
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: 조회할 유저의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 유저의 댓글 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 */
router.get("/all/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const comments = await getAllUsersComments(userId)
    res.status(200).json(comments)
  } catch (err) {
    console.error("Error in getAllUsersComments route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get all user's comments")
  }
})

/**
 * @swagger
 * paths:
 *  /comment/all/post/{postId}:
 *    get:
 *      summary: 특정 게시글의 모든 댓글 조회
 *      tags: [Comments]
 *      description: 특정 게시글에 작성된 모든 댓글을 조회합니다.
 *      parameters:
 *        - in: path
 *          name: postId
 *          required: true
 *          description: 조회할 게시글의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 게시글의 댓글 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 */
router.get("/all/post/:postId", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const comments = await getAllPostsComments(postId)
    res.status(200).json(comments)
  } catch (err) {
    console.error("Error in getAllPostsComments route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get all post's comments")
  }
})

/**
 * @swagger
 * paths:
 *  /comment/all/{userId}/{postId}:
 *    get:
 *      summary: 유저의 특정 게시글 댓글 조회
 *      tags: [Comments]
 *      description: 특정 유저가 특정 게시글에 작성한 댓글을 조회합니다.
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: 조회할 유저의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *        - in: path
 *          name: postId
 *          required: true
 *          description: 조회할 게시글의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 유저의 게시글 댓글 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 */
router.get("/all/:userId/:postId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const postId = parseInt(req.params.postId)
    const comments = await getCommentsByIds(userId, postId)
    res.status(200).json(comments)
  } catch (err) {
    console.error("Error in getCommentsByIds route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get comments by userId and postId")
  }
})

/**
 * @swagger
 * paths:
 *  /comment/{commentId}:
 *    get:
 *      summary: 특정 댓글 조회
 *      tags: [Comments]
 *      description: 특정 ID를 가진 댓글의 정보를 조회합니다.
 *      parameters:
 *        - in: path
 *          name: commentId
 *          required: true
 *          description: 조회할 댓글의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 댓글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get("/:commentId", async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const comment = await getCommentByCommentId(commentId)
    res.status(200).json(comment)
  } catch (err) {
    console.error("Error in getCommentByCommentId route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get comment by commentId")
  }
})

/**
 * @swagger
 * paths:
 *  /comment/create:
 *    post:
 *      summary: 새로운 댓글 추가
 *      tags: [Comments]
 *      description: 새로운 댓글을 추가합니다.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      responses:
 *        "200":
 *          description: 추가된 댓글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.post("/create", async (req, res) => {
  try {
    const commentData = req.body
    const comment = await createComment(commentData)
    res.status(200).json(comment)
  } catch (err) {
    console.error("Error in createCommentByData route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to create comment")
  }
})

/**
 * @swagger
 * paths:
 *  /comment/update/{commentId}:
 *    put:
 *      summary: 댓글 정보 수정
 *      tags: [Comments]
 *      description: 특정 ID를 가진 댓글의 정보를 수정합니다.
 *      parameters:
 *        - in: path
 *          name: commentId
 *          required: true
 *          description: 수정할 댓글의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      responses:
 *        "200":
 *          description: 수정된 댓글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.put("/update/:commentId", async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const commentData = req.body
    const updatedComment = await updateComment(commentId, commentData)
    res.status(200).json(updatedComment)
  } catch (err) {
    console.error("Error in updateCommentById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to update comment")
  }
})

/**
 * @swagger
 * paths:
 *  /comment/delete/{commentId}:
 *    delete:
 *      summary: 댓글 삭제
 *      tags: [Comments]
 *      description: 특정 ID를 가진 댓글을 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: commentId
 *          required: true
 *          description: 삭제할 댓글의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "204":
 *          description: 삭제 성공
 */
router.delete("/delete/:commentId", async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId)
    await deleteComment(commentId)
    res.status(204).end()
  } catch (err) {
    console.error("Error in deleteCommentById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to delete comment")
  }
})

module.exports = router
