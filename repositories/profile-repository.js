const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// 전체 프로필 조회(READ)
const getAllProfiles = async () => {
  try {
    return await prisma.profile.findMany()
  } catch (err) {
    console.error("Error in getAllProfiles: ", err.stack)
    throw new Error("Failed to get all profiles")
  }
}

// 특정 프로필 조회(READ)
const getProfileByProfileId = async (profileId) => {
  try {
    const profiles = await prisma.profile.findMany({ where: { id: profileId } })
    if (profiles.length) {
      const profile = profiles[0]
      return profile
    }
  } catch (err) {
    console.error("Error in getProfileByProfileId: ", err.stack)
    throw new Error("Failed to get profile by profileId")
  }
}

// 새로운 프로필 추가(CREATE)
const createProfile = async (profileData) => {
  try {
    return await prisma.profile.create({
      data: profileData,
    })
  } catch (err) {
    console.error("Error in createProfile: ", err.stack)
    throw new Error("Failed to create profile")
  }
}

// 프로필 정보 수정(UPDATE)
const updateProfile = async (profileId, profileData) => {
  try {
    return await prisma.profile.update({
      where: { id: profileId },
      data: profileData,
    })
  } catch (err) {
    console.error("Error in updateProfile: ", err.stack)
    throw new Error("Failed to update profile")
  }
}

// 프로필 삭제(DELETE)
const deleteProfile = async (profileId) => {
  try {
    await prisma.profile.delete({
      where: { id: profileId },
    })
  } catch (err) {
    console.error("Error in deleteProfile: ", err.stack)
    throw new Error("Failed to delete profile")
  }
}

module.exports = {
  getAllProfiles,
  getProfileByProfileId,
  createProfile,
  updateProfile,
  deleteProfile,
}
