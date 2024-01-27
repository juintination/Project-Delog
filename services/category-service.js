const categoryRepository = require("../repositories/category-repository")

// 전체 카테고리 조회(READ)
async function getAllCategories(userId) {
  try {
    return await categoryRepository.getAllCategories(userId)
  } catch (err) {
    console.error("Error in getAllCategories: ", err.stack)
    throw new Error("Failed to get all categories")
  }
}

// 특정 카테고리 조회(READ)
async function getCategoryById(categoryId) {
  try {
    return await categoryRepository.getCategoryById(categoryId)
  } catch (err) {
    console.error("Error in getCategoryById: ", err.stack)
    throw new Error("Failed to get category by categoryId")
  }
}

// 새로운 카테고리 추가(CREATE)
async function createCategory(categoryData) {
  try {
    return await categoryRepository.createCategory(categoryData)
  } catch (err) {
    console.error("Error in createCategory: ", err.stack)
    throw new Error("Failed to create category")
  }
}

// 카테고리 수정(UPDATE)
async function updateCategory(categoryId, categoryData) {
  try {
    return await categoryRepository.updateCategory(categoryId, categoryData)
  } catch (err) {
    console.error("Error in updateCategory: ", err.stack)
    throw new Error("Failed to update category")
  }
}

// 카테고리 삭제(DELETE)
async function deleteCategory(categoryId) {
  try {
    return await categoryRepository.deleteCategory(categoryId)
  } catch (err) {
    console.error("Error in deleteCategory: ", err.stack)
    throw new Error("Failed to delete category")
  }
}

// 외부에서 직접 호출할 수 있도록 함수들을 export
module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
