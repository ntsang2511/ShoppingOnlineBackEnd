const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description, discount } = newProduct

    try {
      const checkProduct = await Product.findOne({
        name: name
      })
      if (checkProduct !== null) {
        resolve({
          status: 'ERR',
          message: 'Tên của sản phẩm này đã tồn tại, hãy tạo sản phẩm khác'
        })
      }
      const newProduct = await Product.create({ name, image, type, price, countInStock, rating, description, discount })
      if (newProduct) {
        resolve({
          status: 'OK',
          message: 'Tạo sản phẩm mới thành công',
          data: newProduct
        })
      }
    } catch (err) {
      reject(err)
    }
  })
}

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id
      })

      if (checkProduct === null) {
        resolve({
          status: 'ERR',
          message: 'Sản phẩm không tồn tại'
        })
      }

      const updatedProductById = await Product.findByIdAndUpdate(id, data, { new: true })

      resolve({
        status: 'OK',
        message: 'Cập nhập thông tin sản phẩm thành công',
        data: updatedProductById
      })
    } catch (err) {
      reject(err)
    }
  })
}

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id
      })

      if (checkProduct === null) {
        resolve({
          status: 'ERR',
          message: 'Sản phẩm không tồn tại'
        })
      }

      await Product.findByIdAndDelete(id)

      resolve({
        status: 'OK',
        message: 'Xóa sản phẩm thành công'
      })
    } catch (err) {
      reject(err)
    }
  })
}

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments()
      let allProduct = []
      if (filter) {
        const label = filter[0]
        const allProductFilter = await Product.find({ [label]: { $regex: filter[1] } })
          .limit(limit)
          .skip(page * limit)
        resolve({
          status: 'OK',
          message: 'Get all Product sucessfully',
          data: allProductFilter,
          total: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit)
        })
      }

      if (sort) {
        const objectSort = {}
        objectSort[sort[1]] = sort[0]
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
        resolve({
          status: 'OK',
          message: 'Get all Product sucessfully',
          data: allProductSort,
          total: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit)
        })
      }
      if (!limit) {
        allProduct = await Product.find()
      } else {
        allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit)
      }

      resolve({
        status: 'OK',
        message: 'Get all Product sucessfully',
        data: allProduct,
        total: totalProduct,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalProduct / limit)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const getAllTypeProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct('type')

      resolve({
        status: 'OK',
        message: 'Get all Product sucessfully',
        data: allType
      })
    } catch (err) {
      reject(err)
    }
  })
}

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id
      })
      if (product === null) {
        resolve({
          status: 'ERR',
          message: 'Sản phẩm không tồn tại'
        })
      }

      resolve({
        status: 'OK',
        message: 'Get details success',
        data: product
      })
    } catch (err) {
      reject(err)
    }
  })
}
const deleteManyProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: id })

      resolve({
        status: 'OK',
        message: 'Xóa thành công'
      })
    } catch (err) {
      reject(err)
    }
  })
}
module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
  getAllTypeProduct
}
