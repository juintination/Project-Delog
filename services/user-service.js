const userRepository = require("../repositories/user-repository")

// 전체 유저 조회(READ)
async function getAllUsers() {
  try {
    return await userRepository.getAllUsers()
  } catch (err) {
    console.error("Error in getAllUsers: ", err.stack)
    return new Error("Failed to get all users")
  }
}

// id로 특정 유저 조회(READ)
async function getUserById(userId) {
  try {
    return await userRepository.getUserById(userId)
  } catch (err) {
    console.error("Error in getUserById: ", err.stack)
    return new Error("Failed to get user by Id")
  }
}

// 이메일로 특정 유저 조회(READ)
async function getUserByEmail(userEmail) {
  try {
    return await userRepository.getUserByEmail(userEmail)
  } catch (err) {
    console.error("Error in getUserByEmail: ", err.stack)
    return new Error("Failed to get user by Email")
  }
}

// 새로운 유저 추가(CREATE)
async function createUser(userData) {
  try {
    return await userRepository.createUser(userData)
  } catch (err) {
    console.error("Error in createUser: ", err.stack)
    return new Error("Failed to create user")
  }
}

// 유저 정보 수정(UPDATE)
async function updateUser(userId, userData) {
  try {
    return await userRepository.updateUser(userId, userData)
  } catch (err) {
    console.error("Error in updateUser: ", err.stack)
    return new Error("Failed to update user")
  }
}

// 유저 삭제(DELETE)
async function deleteUser(userId) {
  try {
    return await userRepository.deleteUser(userId)
  } catch (err) {
    console.error("Error in deleteUser: ", err.stack)
    return new Error("Failed to delete user")
  }
}

// 외부에서 직접 호출할 수 있도록 함수들을 export
module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
}
