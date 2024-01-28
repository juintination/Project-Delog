const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// 전체 유저 조회(READ)
const getAllUsers = async () => {
  try {
    return await prisma.user.findMany()
  } catch (err) {
    console.error("Error in getAllUsers: ", err.stack)
    throw new Error("Failed to get all users")
  }
}

// id로 특정 유저 조회(READ)
const getUserById = async (userId) => {
  try {
    const users = await prisma.user.findMany({ where: { id: userId } })
    if (users.length) {
      const user = users[0]
      return user
    }
  } catch (err) {
    console.error("Error in getUserById: ", err.stack)
    throw new Error("Failed to get user by Id")
  }
}

// 이메일로 특정 유저 조회(READ)
const getUserByEmail = async (userEmail) => {
  try {
    const users = await prisma.user.findMany({ where: { email: userEmail } })
    if (users.length) {
      const user = users[0]
      return user
    }
  } catch (err) {
    console.error("Error in getUserByEmail: ", err.stack)
    throw new Error("Failed to get user by Email")
  }
}

// 새로운 유저 추가(CREATE)
const createUser = async (userData) => {
  try {
    var userProfile = await prisma.profile.create({
      data: { nickname: userData.name },
    })
  } catch (err) {
    console.error("Error in createUser: ", err.stack)
    throw new Error("Failed to create profile")
  }

  try {
    userData.birth = new Date(userData.birth)
    userData.profile_id = userProfile.id
    var user = await prisma.user.create({
      data: userData,
    })

    defaultCategory = await prisma.category.create({
      data: { name: "전체", user_id: user.id },
    })
    return user
  } catch (err) {
    console.error("Error in createUser: ", err.stack)
    throw new Error("Failed to create user")
  }
}

// 유저 정보 수정(UPDATE)
const updateUser = async (userId, userData) => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: userData,
    })
  } catch (err) {
    console.error("Error in updateUser: ", err.stack)
    throw new Error("Failed to update user")
  }
}

// 유저 삭제(DELETE)
const deleteUser = async (userId) => {
  try {
    await prisma.comment.deleteMany({
      where: { user_id: userId },
    })
    await prisma.category.deleteMany({
      where: { user_id: userId },
    })
    const users = await prisma.user.findMany({ where: { id: userId } })
    if (users.length) {
      var user = users[0]
    }
    await prisma.profile.delete({
      where: { id: user.profile_id },
    })
  } catch (err) {
    console.error("Error in deleteUser: ", err.stack)
    throw new Error("Failed to delete profile")
  }

  try {
    return await prisma.user.delete({
      where: { id: userId },
    })
  } catch (err) {
    console.error("Error in deleteUser: ", err.stack)
    throw new Error("Failed to delete user")
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
}
