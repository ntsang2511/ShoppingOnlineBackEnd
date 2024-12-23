const express = require('express')
const PaymentController = require('../controllers/PaymentController')
const router = express.Router()

router.post('/zalopay', PaymentController.zaloPayment)
router.post('/zalopay/callback', PaymentController.zaloPaymentCallback)
router.post('/zalopay/order-status/:app_trans_id', PaymentController.zaloPayOrderStatus)
module.exports = router
