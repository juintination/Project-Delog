const postRepository = require("../repositories/post-repository")

// 전체 게시글 조회(READ)
async function getAllPosts(categoryId) {
  try {
    return await postRepository.getAllPosts(categoryId)
  } catch (err) {
    console.error("Error in getAllPost: ", err.stack)
    return new Error("Failed to get all categories")
  }
}

// 특정 게시글 조회(READ)
async function getPostById(postId) {
  try {
    return await postRepository.getPostById(postId)
  } catch (err) {
    console.error("Error in getPostById: ", err.stack)
    return new Error("Failed to get post by postId")
  }
}

// 새로운 게시글 추가(CREATE)
async function createPost(postData) {
  try {
    return await postRepository.createPost(postData)
  } catch (err) {
    console.error("Error in createPost: ", err.stack)
    return new Error("Failed to create post")
  }
}

// 게시글 수정(UPDATE)
async function updatePost(postId, postData) {
  try {
    return await postRepository.updatePost(postId, postData)
  } catch (err) {
    console.error("Error in updatePost: ", err.stack)
    return new Error("Failed to update post")
  }
}

// 게시글 삭제(DELETE)
async function deletePost(postId) {
  try {
    return await postRepository.deletePost(postId)
  } catch (err) {
    console.error("Error in deletePost: ", err.stack)
    return new Error("Failed to delete post")
  }
}

// 외부에서 직접 호출할 수 있도록 함수들을 export
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
}
