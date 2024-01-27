const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// 전체 카테고리 조회(READ)
const getAllCategories = async (userId) => {
  try {
    const categories = await prisma.category.findMany({
      where: { user_id: userId },
    })
    if (categories.length) {
      return categories
    }
  } catch (err) {
    console.error("Error in getAllCategories: ", err.stack)
    throw new Error("Failed to get all categories")
  }
}

// 특정 카테고리 조회(READ)
const getCategoryById = async (categoryId) => {
  try {
    const categories = await prisma.category.findMany({
      where: { id: categoryId },
    })
    if (categories.length) {
      const category = categories[0]
      return category
    }
  } catch (err) {
    console.error("Error in getCategoryById: ", err.stack)
    throw new Error("Failed to get category by id")
  }
}

// 새로운 카테고리 추가(CREATE)
const createCategory = async (categoryData) => {
  try {
    return await prisma.category.create({
      data: categoryData,
    })
  } catch (err) {
    console.error("Error in createCategory: ", err.stack)
    throw new Error("Failed to create category")
  }
}

// 카테고리 정보 수정(UPDATE)
const updateCategory = async (categoryId, categoryData) => {
  try {
    return await prisma.category.update({
      where: { id: categoryId },
      data: categoryData,
    })
  } catch (err) {
    console.error("Error in updateCategory: ", err.stack)
    throw new Error("Failed to update category")
  }
}

// 카테고리 삭제(DELETE)
const deleteCategory = async (categoryId) => {
  try {
    return await prisma.category.delete({
      where: { id: categoryId },
    })
  } catch (err) {
    console.error("Error in deleteCategory: ", err.stack)
    throw new Error("Failed to delete category")
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
