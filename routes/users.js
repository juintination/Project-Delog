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

// 전체 유저 조회(READ)
router.get("/all", async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (err) {
    console.error("Error in getAllUsers route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get all users")
  }
})

// id로 특정 유저 조회(READ)
router.get("/id/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const user = await getUserById(userId)
    res.status(200).json(user)
  } catch (err) {
    console.error("Error in getUserById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get user by Id")
  }
})

// 이메일로 특정 유저 조회(READ)
router.get("/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail
    const user = await getUserByEmail(userEmail)
    res.status(200).json(user)
  } catch (err) {
    console.error("Error in getUserByEmail route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get user by Email")
  }
})

// 새로운 유저 추가(CREATE)
router.post("/create", async (req, res) => {
  try {
    const userData = req.body
    const user = await createUser(userData)
    res.status(200).json(user)
  } catch (err) {
    console.error("Error in createUserByData route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to create user")
  }
})

// 유저 정보 수정(UPDATE)
router.put("/update/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const userData = req.body
    const updatedUser = await updateUser(userId, userData)
    res.status(200).json(updatedUser)
  } catch (err) {
    console.error("Error in updateUserById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to update user")
  }
})

// 유저 삭제(DELETE)
router.delete("/delete/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    await deleteUser(userId)
    res.status(204).end()
  } catch (err) {
    console.error("Error in deleteUserById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to delete user")
  }
})

module.exports = router
