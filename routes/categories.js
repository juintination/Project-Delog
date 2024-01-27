const express = require("express")
const router = express.Router()

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/category-service")

// 전체 카테고리 조회(READ)
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

// 특정 카테고리 조회(READ)
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

// 새로운 카테고리 추가(CREATE)
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

// 카테고리 수정(UPDATE)
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

// 카테고리 삭제(DELETE)
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
