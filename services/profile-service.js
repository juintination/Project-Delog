const profileRepository = require("../repositories/profile-repository")

// 전체 프로필 조회(READ)
async function getAllProfiles() {
  try {
    return await profileRepository.getAllProfiles()
  } catch (err) {
    console.error("Error in getAllProfiles: ", err.stack)
    throw new Error("Failed to get all profiles")
  }
}

// 특정 프로필 조회(READ)
async function getProfileByProfileId(profileId) {
  try {
    return await profileRepository.getProfileByProfileId(profileId)
  } catch (err) {
    console.error("Error in getProfileByProfileId: ", err.stack)
    throw new Error("Failed to get profile by profileId")
  }
}

// 새로운 프로필 추가(CREATE)
async function createProfile(profileData) {
  try {
    return await profileRepository.createProfile(profileData)
  } catch (err) {
    console.error("Error in createProfile: ", err.stack)
    throw new Error("Failed to create profile")
  }
}

// 프로필 정보 수정(UPDATE)
async function updateProfile(profileId, profileData) {
  try {
    return await profileRepository.updateProfile(profileId, profileData)
  } catch (err) {
    console.error("Error in updateProfile: ", err.stack)
    throw new Error("Failed to update profile")
  }
}

// 프로필 삭제(DELETE)
async function deleteProfile(profileId) {
  try {
    return await profileRepository.deleteProfile(profileId)
  } catch (err) {
    console.error("Error in deleteProfile: ", err.stack)
    throw new Error("Failed to delete profile")
  }
}

// 외부에서 직접 호출할 수 있도록 함수들을 export
module.exports = {
  getAllProfiles,
  getProfileByProfileId,
  createProfile,
  updateProfile,
  deleteProfile,
}
