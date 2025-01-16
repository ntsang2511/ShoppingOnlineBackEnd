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

const getRatingProduct = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(name)
      const productRatings = await ProductRating.find({ name })
      console.log('🚀 ~ returnnewPromise ~ productRatings:', productRatings)
      if (productRatings.length < 0) {
        resolve({
          status: 'OK',
          message: 'Chưa có đánh giá nào cho sản phẩm này'
        })
      }

      resolve({
        status: 'OK',
        message: 'Đã lấy thành công đánh giá sản phẩm',
        data: productRatings
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
