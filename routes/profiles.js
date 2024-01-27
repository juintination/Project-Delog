const express = require("express")
const router = express.Router()

const {
  getAllProfiles,
  getProfileByProfileId,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../services/profile-service")

// 전체 프로필 조회(READ)
router.get("/all", async (req, res) => {
  try {
    const profiles = await getAllProfiles()
    res.status(200).json(profiles)
  } catch (err) {
    console.error("Error is getAllProfiles route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get all Profiles")
  }
})

// 특정 프로필 조회(READ)
router.get("/:profileId", async (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId)
    const profile = await getProfileByProfileId(profileId)
    res.status(200).json(profile)
  } catch (err) {
    console.error("Error is getProfileByProfileId route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get profile by profileId")
  }
})

// 새로운 프로필 추가(CREATE)
router.post("/create", async (req, res) => {
  try {
    const profileData = req.body
    const profile = await createProfile(profileData)
    res.status(200).json(profile)
  } catch (err) {
    console.error("Error in createProfile route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to create profile")
  }
})

// 프로필 정보 수정(UPDATE)
router.put("/update/:profileId", async (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId)
    const profileData = req.body
    console.log(profileData)
    const updatedProfile = await updateProfile(profileId, profileData)
    res.status(200).json(updatedProfile)
  } catch (err) {
    console.error("Error is updateProfileById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to update profile")
  }
})

// 프로필 삭제(DELETE)
router.delete("/delete/:profileId", async (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId)
    await deleteProfile(profileId)
    res.status(204).end()
  } catch (err) {
    console.error("Error is deleteProfileById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to delete profile")
  }
})

module.exports = router
