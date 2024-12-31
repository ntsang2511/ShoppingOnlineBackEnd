const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
  try {
    const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullname, address, city, phone } = req.body
    if (!paymentMethod || !itemsPrice || shippingPrice < 0 || !totalPrice || !fullname || !address || !city || !phone) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Vui lòng nhập đủ thông tin'
      })
    }
    const response = await OrderService.createOrder(req.body)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
const deliveryOrder = async (req, res) => {
  try {
    const { orderId } = req.body
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' })
    }
    const response = await OrderService.deliveryOrder(orderId)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id
    if (!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await OrderService.getAllOrderDetails(userId)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
const getAllOrderShipper = async (req, res) => {
  try {
    console.log(12)
    const response = await OrderService.getAllOrderShipper()
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id
    if (!orderId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The orderId is required'
      })
    }
    const response = await OrderService.getOrderDetails(orderId)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const cancelOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id
    if (!orderId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The orderId is required'
      })
    }
    const response = await OrderService.cancelOrderDetails(orderId)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrderShipper,
  deliveryOrder
}
