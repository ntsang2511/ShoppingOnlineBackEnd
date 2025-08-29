const ProductRating = require('../models/ProductRatingModel')

const createProductRating = (user, name, rating, comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productRatings = await ProductRating.create({ user, name, rating, comment })

      resolve({
        status: 'OK',
        message: 'Tạo đánh giá sản phẩm',
        data: productRatings
      })
    } catch (err) {
      reject(err)
    }
  })
}

const editProductRating = (id, user, name, rating, comment, likes, dislikes) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra đầu vào
      if (!id || !user || !name || rating === undefined || !comment) {
        return resolve({
          status: 'ERR',
          message: 'Thiếu các trường bắt buộc'
        })
      }
      if (likes < 0 || dislikes < 0) {
        return resolve({
          status: 'ERR',
          message: 'Số lượt thích hoặc không thích không được âm'
        })
      }

      // Tìm bản ghi đánh giá
      const findRating = await ProductRating.findById(id)
      if (!findRating) {
        return resolve({
          status: 'ERR',
          message: 'Không tìm thấy đánh giá'
        })
      }

      // Logic ngăn like/dislike nhiều lần và xóa hành động đối lập
      let updateFields = { user, name, rating, comment }
      if (likes > findRating.likes) {
        // Nếu là like (likes tăng)
        if (findRating.likedBy.includes(user)) {
          return resolve({
            status: 'ERR',
            message: 'Bạn đã thích đánh giá này!'
          })
        }
        updateFields = {
          ...updateFields,
          likes: findRating.likes + 1, // Tăng likes chính xác 1
          $addToSet: { likedBy: user }, // Thêm user vào likedBy
          $pull: { dislikedBy: user } // Xóa user khỏi dislikedBy nếu có
        }
        if (findRating.dislikedBy.includes(user)) {
          updateFields.dislikes = Math.max(0, findRating.dislikes - 1) // Giảm dislikes chính xác 1
        } else {
          updateFields.dislikes = findRating.dislikes // Giữ nguyên dislikes
        }
      } else if (dislikes > findRating.dislikes) {
        // Nếu là dislike (dislikes tăng)
        if (findRating.dislikedBy.includes(user)) {
          return resolve({
            status: 'ERR',
            message: 'Bạn đã không thích đánh giá này!'
          })
        }
        updateFields = {
          ...updateFields,
          dislikes: findRating.dislikes + 1, // Tăng dislikes chính xác 1
          $addToSet: { dislikedBy: user }, // Thêm user vào dislikedBy
          $pull: { likedBy: user } // Xóa user khỏi likedBy nếu có
        }
        if (findRating.likedBy.includes(user)) {
          updateFields.likes = Math.max(0, findRating.likes - 1) // Giảm likes chính xác 1
        } else {
          updateFields.likes = findRating.likes // Giữ nguyên likes
        }
      } else {
        // Nếu không phải like hoặc dislike, giữ nguyên likes/dislikes
        updateFields.likes = findRating.likes
        updateFields.dislikes = findRating.dislikes
      }

      // Cập nhật đánh giá sử dụng findByIdAndUpdate, vô hiệu hóa timestamps
      const updateRating = await ProductRating.findByIdAndUpdate(
        id,
        updateFields,
        { new: true, timestamps: false } // Không cập nhật updatedAt
      )

      // Kiểm tra xem cập nhật có thành công không
      if (!updateRating) {
        return resolve({
          status: 'ERR',
          message: 'Không thể cập nhật đánh giá'
        })
      }

      resolve({
        status: 'OK',
        message: 'Chỉnh sửa đánh giá sản phẩm thành công',
        data: updateRating
      })
    } catch (err) {
      reject({
        status: 'ERR',
        message: 'Lỗi server',
        error: err.message
      })
    }
  })
}
const deleteProductRating = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ProductRating.findByIdAndDelete(id)
      resolve({
        status: 'OK',
        message: 'Xóa thành công'
      })
    } catch (err) {
      reject(err)
    }
  })
}

const getRatingProduct = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProductRating = await ProductRating.find({ name }).countDocuments()
      const allProductRating = await ProductRating.find({ name })
      if (allProductRating.length < 0) {
        resolve({
          status: 'OK',
          message: 'Không có đánh giá nào cho sản phẩm'
        })
      }
      resolve({
        status: 'OK',
        message: 'Đã lấy thành công đánh giá sản phẩm',
        data: allProductRating,
        total: totalProductRating
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  createProductRating,
  getRatingProduct,
  editProductRating,
  deleteProductRating
}
