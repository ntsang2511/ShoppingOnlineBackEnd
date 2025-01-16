const axios = require('axios')
const CryptoJS = require('crypto-js')
const moment = require('moment')
const qs = require('qs')
const Order = require('../models/OrderProduct')
const config = {
  app_id: '2554',
  key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
  key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
}
const createOrder = async (orderInfo) => {
  const transID = Math.floor(Math.random() * 1000000)
  const embed_data = {
    redirecturl: 'http://localhost:5173'
  }
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: orderInfo.user,
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(orderInfo.items),
    embed_data: JSON.stringify(embed_data),
    amount: orderInfo.amount,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: orderInfo.bankCode,
    callback_url: 'https://c970-103-89-86-114.ngrok-free.app/api/payment/zalopay/callback'
  }
  console.log(`App trans iD is ${moment().format('YYMMDD')}_${transID}`)
  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()
  try {
    // Gửi request đến Zalo Pay
    const response = await axios.post(config.endpoint, null, { params: order })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi kết nối Zalo Pay')
  }
}

const zaloPaymentCallback = async (dataStr, reqMac) => {
  let result = {}
  try {
    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString()
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.returncode = -1
      result.returnmessage = 'mac not equal'
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2)
      // Lấy orderID từ order mới tạo
      const orderId = JSON.parse(dataJson.item)
      const orderUpdate = await Order.findByIdAndUpdate(orderId[0].orderId, { isPaid: true }, { new: true })
      console.log(orderUpdate)
      console.log("update order's status = success where app_trans_id =", dataJson['app_trans_id'])
      result.return_code = 1
      result.return_message = 'success'
    }
  } catch (ex) {
    result.return_code = 0 // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message
  }
  // thông báo kết quả cho ZaloPay server
  return result
}

const zaloPayOrderStatus = async (app_trans_id) => {
  let postData = {
    app_id: config.app_id,
    app_trans_id: app_trans_id // Input your app_trans_id
  }

  let data = postData.app_id + '|' + postData.app_trans_id + '|' + config.key1 // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

  let postConfig = {
    method: 'post',
    url: 'https://sb-openapi.zalopay.vn/v2/query',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
  }

  try {
    const result = await axios(postConfig)
    return result
  } catch (e) {
    console.log(e.message)
  }
}
module.exports = { createOrder, zaloPaymentCallback, zaloPayOrderStatus }
