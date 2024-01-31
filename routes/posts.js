/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: 게시글 CRUD
 */

const express = require("express")
const router = express.Router()

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../services/post-service")

/**
 * @swagger
 * paths:
 *  /post/all/{categoryId}:
 *    get:
 *      summary: 모든 게시글 조회
 *      tags: [Posts]
 *      description: 특정 카테고리의 모든 게시글을 조회합니다.
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          required: true
 *          description: 조회할 게시글의 카테고리 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 게시글 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 */
router.get("/all/:categoryId", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId)
    const posts = await getAllPosts(categoryId)
    res.status(200).json(posts)
  } catch (err) {
    console.error("Error in getAllPosts route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get all posts")
  }
})

/**
 * @swagger
 * paths:
 *  /post/{postId}:
 *    get:
 *      summary: 특정 게시글 조회
 *      tags: [Posts]
 *      description: 특정 ID를 가진 게시글의 정보를 조회합니다.
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
 *          description: 게시글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get("/:postId", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const post = await getPostById(postId)
    res.status(200).json(post)
  } catch (err) {
    console.error("Error in getPostById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get post by postId")
  }
})

/**
 * @swagger
 * paths:
 *  /post/create:
 *    post:
 *      summary: 새로운 게시글 추가
 *      tags: [Posts]
 *      description: 새로운 게시글을 추가합니다.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      responses:
 *        "200":
 *          description: 추가된 게시글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.post("/create", async (req, res) => {
  try {
    const postData = req.body
    const post = await createPost(postData)
    res.status(200).json(post)
  } catch (err) {
    console.error("Error in createPostByData route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to create post")
  }
})

/**
 * @swagger
 * paths:
 *  /post/update/{postId}:
 *    put:
 *      summary: 게시글 정보 수정
 *      tags: [Posts]
 *      description: 특정 ID를 가진 게시글의 정보를 수정합니다.
 *      parameters:
 *        - in: path
 *          name: postId
 *          required: true
 *          description: 수정할 게시글의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      responses:
 *        "200":
 *          description: 수정된 게시글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.put("/update/:postId", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const postData = req.body
    const updatedPost = await updatePost(postId, postData)
    res.status(200).json(updatedPost)
  } catch (err) {
    console.error("Error in updatePostById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to update post")
  }
})

/**
 * @swagger
 * paths:
 *  /post/delete/{postId}:
 *    delete:
 *      summary: 게시글 삭제
 *      tags: [Posts]
 *      description: 특정 ID를 가진 게시글을 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: postId
 *          required: true
 *          description: 삭제할 게시글의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "204":
 *          description: 삭제 성공
 */
router.delete("/delete/:postId", async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    await deletePost(postId)
    res.status(204).end()
  } catch (err) {
    console.error("Error in deletePostById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to delete post")
  }
})

module.exports = router
