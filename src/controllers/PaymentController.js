const zaloService = require('../services/ZaloService.js')
const zaloPayment = async (req, res) => {
  try {
    const { amount, bankCode, items, user } = req.body
    const orderInfo = { amount, bankCode, items, user }
    // Gọi service để tạo order
    const zaloPayResponse = await zaloService.createOrder(orderInfo)
    res.status(200).json({
      message: 'Tạo đơn hàng thành công',
      data: zaloPayResponse
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const zaloPaymentCallback = async (req, res) => {
  try {
    let dataStr = req.body.data
    let reqMac = req.body.mac
    const zaloPaycallBack = await zaloService.zaloPaymentCallback(dataStr, reqMac)
    res.status(200).json({
      message: 'Đã thanh toán đơn hàng',
      data: zaloPaycallBack
    })
  } catch (e) {
    console.log(e)
  }
}
const zaloPayOrderStatus = async (req, res) => {
  try {
    const app_trans_id = req.params.app_trans_id
    const zaloPayStatusOrder = await zaloService.zaloPayOrderStatus(app_trans_id)
    res.status(200).json({
      message: 'Trạng thái đơn hàng',
      data: zaloPayStatusOrder.data
    })
  } catch (e) {}
}

module.exports = { zaloPayment, zaloPaymentCallback, zaloPayOrderStatus }
