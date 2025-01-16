const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
router.post('/create', OrderController.createOrder)
router.post('/delivery', OrderController.deliveryOrder)
router.get('/get-all-orders/:id', OrderController.getAllOrderDetails)
router.get('/get-details-orders/:id', OrderController.getDetailsOrder)
router.get('/get-ship-order', OrderController.getAllOrderShipper)
router.get('/get-shipped-order/:userid', OrderController.getShippedOrderByUserId)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)

module.exports = router
