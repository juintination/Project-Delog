/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: 카테고리 CRUD
 */

const express = require("express")
const router = express.Router()

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/category-service")

/**
 * @swagger
 * paths:
 *  /category/all/{userId}:
 *    get:
 *      summary: 사용자의 모든 카테고리 조회
 *      tags: [Categories]
 *      description: 특정 사용자의 모든 카테고리를 조회합니다.
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: 조회할 사용자의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 사용자의 카테고리 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 */
router.get("/all/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const categories = await getAllCategories(userId)
    res.status(200).json(categories)
  } catch (err) {
    console.error("Error in getAllCategories route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get all categories")
  }
})

/**
 * @swagger
 * paths:
 *  /category/{categoryId}:
 *    get:
 *      summary: 특정 카테고리 조회
 *      tags: [Categories]
 *      description: 특정 ID를 가진 카테고리를 조회합니다.
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          required: true
 *          description: 조회할 카테고리의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "200":
 *          description: 카테고리 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId)
    const category = await getCategoryById(categoryId)
    res.status(200).json(category)
  } catch (err) {
    console.error("Error in getCategoryById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to get category by categoryId")
  }
})

/**
 * @swagger
 * paths:
 *  /category/create:
 *    post:
 *      summary: 새로운 카테고리 추가
 *      tags: [Categories]
 *      description: 새로운 카테고리를 추가합니다.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      responses:
 *        "200":
 *          description: 추가된 카테고리 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.post("/create", async (req, res) => {
  try {
    const categoryData = req.body
    const category = await createCategory(categoryData)
    res.status(200).json(category)
  } catch (err) {
    console.error("Error in createCategoryByData route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to create category")
  }
})

/**
 * @swagger
 * paths:
 *  /category/update/{categoryId}:
 *    put:
 *      summary: 카테고리 정보 수정
 *      tags: [Categories]
 *      description: 특정 ID를 가진 카테고리의 정보를 수정합니다.
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          required: true
 *          description: 수정할 카테고리의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      responses:
 *        "200":
 *          description: 수정된 카테고리 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.put("/update/:categoryId", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId)
    const categoryData = req.body
    const updatedCategory = await updateCategory(categoryId, categoryData)
    res.status(200).json(updatedCategory)
  } catch (err) {
    console.error("Error in updateCategoryById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to update category")
  }
})

/**
 * @swagger
 * paths:
 *  /category/delete/{categoryId}:
 *    delete:
 *      summary: 카테고리 삭제
 *      tags: [Categories]
 *      description: 특정 ID를 가진 카테고리를 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          required: true
 *          description: 삭제할 카테고리의 ID
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        "204":
 *          description: 삭제 성공
 */
router.delete("/delete/:categoryId", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId)
    await deleteCategory(categoryId)
    res.status(204).end()
  } catch (err) {
    console.error("Error in deleteCategoryById route: ", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
    throw new Error("Failed to delete category")
  }
})

module.exports = router
