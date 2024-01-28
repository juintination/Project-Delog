const commentRepository = require("../repositories/comment-repository")

// 전체 댓글 조회(READ)
async function getAllUsersComments(userId) {
  try {
    return await commentRepository.getAllUsersComments(userId)
  } catch (err) {
    console.error("Error in getAllUsersComments: ", err.stack)
    throw new Error("Failed to get all comments")
  }
}

// 특정 게시글에 대한 전체 댓글 조회(READ)
async function getAllPostsComments(userId) {
  try {
    return await commentRepository.getAllPostsComments(userId)
  } catch (err) {
    console.error("Error in getAllPostsComments: ", err.stack)
    throw new Error("Failed to get all comments")
  }
}

// 유저의 특정 게시글에 대한 댓글 조회(READ)
async function getCommentsByIds(userId, postId) {
  try {
    return await commentRepository.getCommentsByIds(userId, postId)
  } catch (err) {
    console.error("Error in getCommentsByIds: ", err.stack)
    throw new Error("Failed to get comments by userId and postId")
  }
}

// 특정 댓글 조회(READ)
async function getCommentByCommentId(commentId) {
  try {
    return await commentRepository.getCommentByCommentId(commentId)
  } catch (err) {
    console.error("Error in getCommentsByIds: ", err.stack)
    throw new Error("Failed to get comment by commentId")
  }
}

// 새로운 댓글 추가(CREATE)
async function createComment(commentData) {
  try {
    return await commentRepository.createComment(commentData)
  } catch (err) {
    console.error("Error in createComment: ", err.stack)
    throw new Error("Failed to create comment")
  }
}

// 댓글 수정(UPDATE)
async function updateComment(commentId, commentData) {
  try {
    return await commentRepository.updateComment(commentId, commentData)
  } catch (err) {
    console.error("Error in updateComment: ", err.stack)
    throw new Error("Failed to update comment")
  }
}

// 댓글 삭제(DELETE)
async function deleteComment(commentId) {
  try {
    return await commentRepository.deleteComment(commentId)
  } catch (err) {
    console.error("Error in deleteComment: ", err.stack)
    throw new Error("Failed to delete comment")
  }
}

// 외부에서 직접 호출할 수 있도록 함수들을 export
module.exports = {
  getAllUsersComments,
  getAllPostsComments,
  getCommentsByIds,
  getCommentByCommentId,
  createComment,
  updateComment,
  deleteComment,
}
