const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// 전체 게시글 조회(READ)
const getAllPosts = async (categoryId) => {
  try {
    const posts = await prisma.post.findMany({
      where: { category_id: categoryId },
    })
    if (posts.length) {
      return posts
    }
  } catch (err) {
    console.error("Error in getAllPosts: ", err.stack)
    return new Error("Failed to get all posts")
  }
}

// 특정 게시글 조회(READ)
const getPostById = async (postId) => {
  try {
    return await prisma.post.findUnique({
      where: { id: postId },
    })
  } catch (err) {
    console.error("Error in getPostById: ", err.stack)
    return new Error("Failed to get post by id")
  }
}

// 새로운 게시글 추가(CREATE)
const createPost = async (postData) => {
  try {
    return await prisma.post.create({
      data: postData,
    })
  } catch (err) {
    console.error("Error in createPost: ", err.stack)
    return new Error("Failed to create post")
  }
}

// 게시글 정보 수정(UPDATE)
const updatePost = async (postId, postData) => {
  try {
    return await prisma.post.update({
      where: { id: postId },
      data: postData,
    })
  } catch (err) {
    console.error("Error in updatePost: ", err.stack)
    return new Error("Failed to update post")
  }
}

// 게시글 삭제(DELETE)
const deletePost = async (postId) => {
  try {
    return await prisma.post.delete({
      where: { id: postId },
    })
  } catch (err) {
    console.error("Error in deletePost: ", err.stack)
    return new Error("Failed to delete post")
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
}
