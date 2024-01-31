/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 CURD
 */

const express = require("express")
const router = express.Router()

const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/user-service")

/**
 * @swagger
 * paths:
 *  /user/all:
 *    get:
 *      summary: 모든 유저 조회
 *      tags: [Users]
 *      description: 모든 유저의 목록을 조회합니다.
 *      responses:
 *        "200":
 *          description: 유저 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 */
router.get("/all", async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (err) {
    console.error("Error in getAllUsers route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get all users")
  }
})

/**
 * @swagger
 * paths:
 *  /user/id/{userId}:
 *    get:
 *      summary: 특정 유저 조회
 *      tags: [Users]
 *      description: 특정 ID를 가진 유저의 정보를 조회합니다.
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
 *          description: 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get("/id/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const user = await getUserById(userId)
    res.status(200).json(user)
  } catch (err) {
    console.error("Error in getUserById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get user by Id")
  }
})

/**
 * @swagger
 * paths:
 *  /user/{userEmail}:
 *    get:
 *      summary: 이메일로 특정 유저 조회
 *      tags: [Users]
 *      description: 특정 이메일을 가진 유저의 정보를 조회합니다.
 *      parameters:
 *        - in: path
 *          name: userEmail
 *          required: true
 *          description: 조회할 유저의 이메일
 *          schema:
 *            type: string
 *            format: email
 *      responses:
 *        "200":
 *          description: 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get("/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail
    const user = await getUserByEmail(userEmail)
    res.status(200).json(user)
  } catch (err) {
    console.error("Error in getUserByEmail route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get user by Email")
  }
})

/**
 * @swagger
 * paths:
 *  /user/create:
 *    post:
 *      summary: 새로운 유저 추가
 *      tags: [Users]
 *      description: 새로운 유저를 추가합니다.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        "200":
 *          description: 추가된 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post("/create", async (req, res) => {
  try {
    const userData = req.body
    const user = await createUser(userData)
    res.status(200).json(user)
  } catch (err) {
    console.error("Error in createUserByData route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to create user")
  }
})

/**
 * @swagger
 * paths:
 *  /user/update/{userId}:
 *    put:
 *      summary: 유저 정보 수정
 *      tags: [Users]
 *      description: 특정 ID를 가진 유저의 정보를 수정합니다.
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: 수정할 유저의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        "200":
 *          description: 수정된 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.put("/update/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const userData = req.body
    const updatedUser = await updateUser(userId, userData)
    res.status(200).json(updatedUser)
  } catch (err) {
    console.error("Error in updateUserById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to update user")
  }
})

/**
 * @swagger
 * paths:
 *  /user/delete/{userId}:
 *    delete:
 *      summary: 유저 삭제
 *      tags: [Users]
 *      description: 특정 ID를 가진 유저를 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: 삭제할 유저의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "204":
 *          description: 삭제 성공
 */
router.delete("/delete/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    await deleteUser(userId)
    res.status(204).end()
  } catch (err) {
    console.error("Error in deleteUserById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to delete user")
  }
})

module.exports = router
