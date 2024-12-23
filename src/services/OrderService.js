const Order = require('../models/OrderProduct')
const Product = require('../models/ProductModel')
const EmailService = require('./EmailService')
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullname,
      address,
      city,
      phone,
      user,
      email
    } = newOrder
    try {
      // Kiểm tra và cập nhật kho hàng
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount }
          },
          {
            $inc: {
              countInStock: -order.amount,
              selled: +order.amount
            }
          },
          {
            new: true
          }
        )

        return { productData, order }
      })

      // Chờ tất cả các sản phẩm được xử lý
      const results = await Promise.all(promises)

      // Kiểm tra sản phẩm nào không đủ hàng
      const insufficientStock = results.filter((result) => !result.productData)

      if (insufficientStock.length > 0) {
        // Nếu có sản phẩm không đủ hàng, trả về thông báo lỗi
        const failedIds = insufficientStock.map((item) => item.order.product)
        return resolve({
          status: 'ERR',
          message: `Sản phẩm với ID ${failedIds.join(', ')} không đủ hàng`
        })
      }

      // Tạo đơn hàng (chỉ một lần)
      const createdOrder = await Order.create({
        orderItems,
        shippingAddress: { fullName: fullname, address, city, phone },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: user
      })

      if (createdOrder) {
        await EmailService.sendEmailCreateOrder(email, orderItems)
        return resolve({
          status: 'OK',
          message: 'Đơn hàng đã được tạo thành công',
          data: createdOrder
        })
      }

      // Nếu có lỗi khi tạo đơn hàng
      resolve({
        status: 'ERR',
        message: 'Không thể tạo đơn hàng'
      })
    } catch (err) {
      // Bắt lỗi bất kỳ
      reject(err)
    }
  })
}
const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id
      })
      if (order === null) {
        resolve({
          status: 'ERR',
          message: 'Đơn hàng không tồn tại'
        })
      }

      resolve({
        status: 'OK',
        message: 'Get details order success',
        data: order
      })
    } catch (err) {
      reject(err)
    }
  })
}

const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id
      })
      if (order === null) {
        resolve({
          status: 'ERR',
          message: 'Đơn hàng không tồn tại'
        })
      }

      resolve({
        status: 'OK',
        message: 'Get details order success',
        data: order
      })
    } catch (err) {
      reject(err)
    }
  })
}

const cancelOrderDetails = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Lấy thông tin đơn hàng cần xóa
      const order = await Order.findById(orderId)

      if (!order) {
        return resolve({
          status: 'ERR',
          message: 'Không tìm thấy đơn hàng'
        })
      }

      // Duyệt qua từng sản phẩm trong `orderItems` và cập nhật kho hàng
      const updatePromises = order.orderItems.map(async (item) => {
        const { product, amount } = item
        const updatedProduct = await Product.findByIdAndUpdate(
          product,
          {
            $inc: {
              countInStock: +amount, // Cộng lại số lượng sản phẩm vào kho
              selled: -amount // Trừ số lượng sản phẩm đã bán
            }
          },
          { new: true }
        )

        // Kiểm tra nếu không tìm thấy sản phẩm
        if (!updatedProduct) {
          return {
            status: 'ERR',
            message: `Không tìm thấy sản phẩm với id: ${product}`
          }
        }

        return {
          status: 'OK',
          message: `Sản phẩm với id: ${product} đã được cập nhật`
        }
      })

      // Chờ tất cả các sản phẩm được cập nhật
      const results = await Promise.all(updatePromises)

      // Kiểm tra nếu có sản phẩm nào không cập nhật thành công
      const failedUpdates = results.filter((result) => result.status === 'ERR')

      if (failedUpdates.length > 0) {
        return resolve({
          status: 'ERR',
          message: 'Một số sản phẩm không thể cập nhật',
          details: failedUpdates
        })
      }

      // Xóa đơn hàng sau khi cập nhật kho hàng thành công
      const deletedOrder = await Order.findByIdAndDelete(orderId)

      if (deletedOrder) {
        return resolve({
          status: 'OK',
          message: 'Đơn hàng đã được xóa thành công',
          data: order
        })
      }

      resolve({
        status: 'ERR',
        message: 'Không thể xóa đơn hàng'
      })
    } catch (err) {
      console.error(err)
      reject({
        status: 'ERR',
        message: 'Đã xảy ra lỗi trong quá trình xóa đơn hàng',
        error: err.message
      })
    }
  })
}

module.exports = { createOrder, getAllOrderDetails, getOrderDetails, cancelOrderDetails }
