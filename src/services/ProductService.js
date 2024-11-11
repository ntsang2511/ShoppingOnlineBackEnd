const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } = newProduct

    try {
      const checkProduct = await Product.findOne({
        name: name
      })
      if (checkProduct !== null) {
        resolve({
          status: 'ERR',
          message: 'The name of product is already'
        })
      }
      const newProduct = await Product.create({ name, image, type, price, countInStock, rating, description })
      if (newProduct) {
        resolve({
          status: 'OK',
          message: 'success',
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
          message: 'The product is not defined'
        })
      }

      const updatedProductById = await Product.findByIdAndUpdate(id, data, { new: true })

      resolve({
        status: 'OK',
        message: 'success',
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
          message: 'The product is not defined'
        })
      }

      await Product.findByIdAndDelete(id)

      resolve({
        status: 'OK',
        message: 'Delete product  sucessfully'
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
      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit)

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

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id
      })
      if (product === null) {
        resolve({
          status: 'ERR',
          message: 'The product is not defined'
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
module.exports = { createProduct, updateProduct, getDetailsProduct, deleteProduct, getAllProduct }
