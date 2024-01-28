const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// 전체 댓글 조회(READ)
const getAllUsersComments = async (userId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { user_id: userId },
    })
    if (comments.length) {
      return comments
    }
  } catch (err) {
    console.error("Error in getAllUsersComments: ", err.stack)
    throw new Error("Failed to get all comments")
  }
}

// 특정 게시글에 대한 전체 댓글 조회(READ)
const getAllPostsComments = async (postId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { post_id: postId },
    })
    if (comments.length) {
      return comments
    }
  } catch (err) {
    console.error("Error in getAllPostsComments: ", err.stack)
    throw new Error("Failed to get all comments")
  }
}

// 유저의 특정 게시글에 대한 댓글 조회(READ)
const getCommentsByIds = async (userId, postId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { user_id: userId, post_id: postId },
    })
    if (comments.length) {
      return comments
    }
  } catch (err) {
    console.error("Error in getCommentsByIds: ", err.stack)
    throw new Error("Failed to get comments by ids")
  }
}

// 특정 댓글 조회(READ)
const getCommentByCommentId = async (commentId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { id: commentId },
    })
    if (comments.length) {
      const comment = comments[0]
      return comment
    }
  } catch (err) {
    console.error("Error in getCommentByCommentId: ", err.stack)
    throw new Error("Failed to get comment by commentId")
  }
}

// 새로운 댓글 추가(CREATE)
const createComment = async (commentData) => {
  try {
    return await prisma.comment.create({
      data: commentData,
    })
  } catch (err) {
    console.error("Error in createComment: ", err.stack)
    throw new Error("Failed to create comment")
  }
}

// 댓글 정보 수정(UPDATE)
const updateComment = async (commentId, commentData) => {
  try {
    return await prisma.comment.update({
      where: { id: commentId },
      data: commentData,
    })
  } catch (err) {
    console.error("Error in updateComment: ", err.stack)
    throw new Error("Failed to update comment")
  }
}

// 댓글 삭제(DELETE)
const deleteComment = async (commentId) => {
  try {
    return await prisma.comment.delete({
      where: { id: commentId },
    })
  } catch (err) {
    console.error("Error in deleteComment: ", err.stack)
    throw new Error("Failed to delete comment")
  }
}

module.exports = {
  getAllUsersComments,
  getAllPostsComments,
  getCommentsByIds,
  getCommentByCommentId,
  createComment,
  updateComment,
  deleteComment,
}
