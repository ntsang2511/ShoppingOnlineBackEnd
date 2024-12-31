const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
})

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  items: [cartItemSchema]
})
const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
