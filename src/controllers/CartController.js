const CartService = require('../services/CartService')
const getCart = async (req, res) => {
  try {
    const { userId } = req.params
    const response = await CartService.getCart(userId)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const addItem = async (req, res) => {
  try {
    const { name, amount, image, price, product, discount, countInStock, userId } = req.body
    if (!name || !amount || !image || !price || !product || !discount || !countInStock || !userId) {
      return res.status(400).json({
        message: 'Vui lòng nhập đầy đủ thông tin',
        data: {
          name: name,
          amount: amount,
          image,
          price: price,
          product: product,
          discount: discount,
          countInStock,
          userId
        }
      })
    }
    const updatedCart = await CartService.addItemToCart(req.body)
    res.status(200).json(updatedCart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeItem = async (req, res) => {
  try {
    const { userId, product } = req.body
    const updatedCart = await CartService.removeItemFromCart(userId, product)
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    res.status(200).json(updatedCart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const clearCart = async (req, res) => {
  try {
    const { userId, productIds } = req.body
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'Danh sách sản phẩm không hợp lệ' })
    }

    const response = await CartService.clearCart(userId, productIds)
    if (response.status === 'ERR') {
      return res.status(404).json({ message: response.message })
    }

    res.status(200).json({
      message: response.message,
      data: response.data
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const udpateAmountCart = async (req, res) => {
  try {
    const { userId, product, amount } = req.body

    const response = await CartService.udpateAmountCart(userId, product, amount)
    if (response.status === 'ERR') {
      return res.status(404).json({ message: response.message })
    }

    res.status(200).json({
      message: response.message,
      data: response.data
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getCart, addItem, removeItem, clearCart, udpateAmountCart }
