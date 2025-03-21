const ProductRatingService = require('../services/ProductRatingService')

const getProductRating = async (req, res) => {
  try {
    const { limit, page } = req.query
    const { name } = req.params
    const response = await ProductRatingService.getRatingProduct(name, Number(limit) || null, Number(page) || 0)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const createProductRating = async (req, res) => {
  try {
    const { user, name, rating, comment } = req.body
    const response = await ProductRatingService.createProductRating(user, name, rating, comment)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const editProductRating = async (req, res) => {
  try {
    const { user, name, rating, comment } = req.body
    const response = await ProductRatingService.editProductRating(user, name, rating, comment)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const deleteproductRating = async (req, res) => {
  try {
    const { id } = req.params
    const response = await ProductRatingService.deleteProductRating(id)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

module.exports = {
  createProductRating,
  editProductRating,
  getProductRating,
  deleteproductRating
}
