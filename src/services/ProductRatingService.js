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

const editProductRating = (user, name, rating, comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findRating = await ProductRating.find({ name: name, user: user })
      if (!findRating) {
        resolve({
          status: 'OK',
          message: 'KHông tìm thấy'
        })
      }
      const id = findRating._id
      const updateRating = await ProductRating.findByIdAndDelete(id, { user, name, rating, comment }, { new: true })

      resolve({
        status: 'OK',
        message: 'Tạo đánh giá sản phẩm',
        data: updateRating
      })
    } catch (err) {
      reject(err)
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

const getRatingProduct = (name, limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProductRating = await ProductRating.find({ name }).countDocuments()
      console.log(totalProductRating)
      const allProductRating = await ProductRating.find({ name })
        .limit(limit)
        .skip(page * limit)
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
        total: totalProductRating,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalProductRating / limit)
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
