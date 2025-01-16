const mongoose = require('mongoose')
const productRatingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    user: { type: String }
  },
  {
    timestamps: true
  }
)
const ProductRating = mongoose.model('ProductRating', productRatingSchema)
module.exports = ProductRating
