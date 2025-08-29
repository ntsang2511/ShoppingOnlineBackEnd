const mongoose = require('mongoose')
const productRatingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    user: { type: String },
    likedBy: { type: [String], default: [] },
    dislikedBy: { type: [String], default: [] }
  },
  {
    timestamps: true
  }
)
const ProductRating = mongoose.model('ProductRating', productRatingSchema)
module.exports = ProductRating
