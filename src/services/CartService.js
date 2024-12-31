const Cart = require('../models/CartModel')
const getCart = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkCart = await Cart.findOne({
        userId
      })
      if (!checkCart) {
        checkCart = await Cart.create({ userId, items: [] })
      }
      resolve({
        status: 'OK',
        message: 'Lấy cart thành công',
        data: checkCart
      })
    } catch (err) {
      reject(err)
    }
  })
}

const addItemToCart = async (newItemCart) => {
  return new Promise(async (resolve, reject) => {
    const { name, amount, image, price, product, discount, countInStock, userId } = newItemCart
    try {
      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
      const cart = await Cart.findOne({ userId })

      if (cart) {
        // Tìm sản phẩm trong mảng `items`
        const existingItem = cart.items.find((item) => item.product.toString() === product)

        if (existingItem) {
          // Nếu sản phẩm tồn tại, cập nhật số lượng
          existingItem.amount += amount
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào `items`
          cart.items.push({ name, amount, image, price, product, discount, countInStock })
        }

        // Lưu giỏ hàng
        await cart.save()
        resolve({
          status: 'OK',
          message: 'Cập nhật giỏ hàng thành công',
          data: cart
        })
      } else {
        // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng
        const newCart = await Cart.create({
          userId,
          items: [{ name, amount, image, price, product, discount, countInStock }]
        })
        resolve({
          status: 'OK',
          message: 'Tạo mới giỏ hàng và thêm sản phẩm thành công',
          data: newCart
        })
      }
    } catch (err) {
      reject(err)
    }
  })
}

const removeItemFromCart = async (userId, product) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId }, // Tìm giỏ hàng theo userId
        {
          $pull: { items: { product: product } } // Xóa sản phẩm có productId khỏi mảng items
        },
        { new: true } // Trả về giỏ hàng sau khi cập nhật
      )
      if (!updatedCart) {
        resolve({
          status: 'ERR',
          message: 'Không tồn tại sản phẩm cần xóa'
        })
      }

      resolve({
        status: 'OK',
        message: 'Xóa sản phẩm thành công',
        data: updatedCart
      })
    } catch (err) {
      reject(err)
    }
  })
}

const clearCart = async (userId, productIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId }, // Tìm giỏ hàng theo userId
        { $pull: { items: { product: { $in: productIds } } } }, // Xóa các item có productId trong danh sách productIds
        { new: true } // Trả về giỏ hàng sau khi cập nhật
      )
      if (!updatedCart) {
        resolve({
          status: 'ERR',
          message: 'Không tìm thấy giỏ hàng hoặc không có sản phẩm để xóa'
        })
      } else {
        resolve({
          status: 'OK',
          message: 'Đã xóa sản phẩm thành công',
          data: updatedCart
        })
      }
    } catch (err) {
      reject(err)
    }
  })
}

const udpateAmountCart = async (userId, product, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cartUpdate = await Cart.updateOne(
        { userId, 'items.product': product },
        { $set: { 'items.$.amount': amount } }
      )
      resolve({
        status: 'OK',
        message: 'Đã xóa sản phẩm thành công',
        data: cartUpdate
      })
    } catch (error) {
      reject(err)
    }
  })
}

module.exports = { getCart, addItemToCart, removeItemFromCart, clearCart, udpateAmountCart }
