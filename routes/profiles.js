/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: 프로필 CRUD
 */

const express = require("express")
const router = express.Router()

const {
  getAllProfiles,
  getProfileByProfileId,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../services/profile-service")

/**
 * @swagger
 * paths:
 *  /profile/all:
 *    get:
 *      summary: 모든 프로필 조회
 *      tags: [Profiles]
 *      description: 모든 프로필의 목록을 조회합니다.
 *      responses:
 *        "200":
 *          description: 프로필 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 */
router.get("/all", async (req, res) => {
  try {
    const profiles = await getAllProfiles()
    res.status(200).json(profiles)
  } catch (err) {
    console.error("Error in getAllProfiles route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get all Profiles")
  }
})

/**
 * @swagger
 * paths:
 *  /profile/{profileId}:
 *    get:
 *      summary: 특정 프로필 조회
 *      tags: [Profiles]
 *      description: 특정 ID를 가진 프로필의 정보를 조회합니다.
 *      parameters:
 *        - in: path
 *          name: profileId
 *          required: true
 *          description: 조회할 프로필의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 프로필 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get("/:profileId", async (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId)
    const profile = await getProfileByProfileId(profileId)
    res.status(200).json(profile)
  } catch (err) {
    console.error("Error in getProfileByProfileId route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get profile by profileId")
  }
})

/**
 * @swagger
 * paths:
 *  /profile/pic/{profileId}:
 *    get:
 *      summary: 프로필 사진 조회
 *      tags: [Profiles]
 *      description: 특정 ID를 가진 프로필의 사진을 조회합니다.
 *      parameters:
 *        - in: path
 *          name: profileId
 *          required: true
 *          description: 조회할 프로필의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 프로필 사진
 *          content:
 *            image/jpeg:
 *              schema:
 *                type: string
 *                format: binary
 */
router.get("/pic/:profileId", async (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId)
    const profile = await getProfileByProfileId(profileId)
    if (!profile || !profile.pic) {
      return res.sendStatus(404)
    }
    res.set("Content-Type", "image/jpeg")
    res.send(profile.pic)
  } catch (error) {
    console.error("Error in getProfilePicByProfileId route: ", error)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to get profilePic by profileId")
  }
})

/**
 * @swagger
 * paths:
 *  /profile/create:
 *    post:
 *      summary: 새로운 프로필 추가
 *      tags: [Profiles]
 *      description: 새로운 프로필을 추가합니다.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      responses:
 *        "200":
 *          description: 추가된 프로필 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.post("/create", async (req, res) => {
  try {
    const profileData = req.body
    const profile = await createProfile(profileData)
    res.status(200).json(profile)
  } catch (err) {
    console.error("Error in createProfile route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to create profile")
  }
})

/**
 * @swagger
 * paths:
 *  /profile/update/{profileId}:
 *    put:
 *      summary: 프로필 정보 수정
 *      tags: [Profiles]
 *      description: 특정 ID를 가진 프로필의 정보를 수정합니다.
 *      parameters:
 *        - in: path
 *          name: profileId
 *          required: true
 *          description: 수정할 프로필의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      responses:
 *        "200":
 *          description: 수정된 프로필 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.put("/update/:profileId", async (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId)
    const profileData = req.body
    const updatedProfile = await updateProfile(profileId, profileData)
    res.status(200).json(updatedProfile)
  } catch (err) {
    console.error("Error in updateProfileById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to update profile")
  }
})

/**
 * @swagger
 * paths:
 *  /profile/delete/{profileId}:
 *    delete:
 *      summary: 프로필 삭제
 *      tags: [Profiles]
 *      description: 특정 ID를 가진 프로필을 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: profileId
 *          required: true
 *          description: 삭제할 프로필의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "204":
 *          description: 삭제 성공
 */
router.delete("/delete/:profileId", async (req, res) => {
  try {
    const profileId = parseInt(req.params.profileId)
    await deleteProfile(profileId)
    res.status(204).end()
  } catch (err) {
    console.error("Error in deleteProfileById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    return new Error("Failed to delete profile")
  }
})

module.exports = router
