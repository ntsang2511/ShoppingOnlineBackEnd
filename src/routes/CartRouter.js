const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController')
router.get('/get-cart/:userId', CartController.getCart)
router.post('/add-cart', CartController.addItem)
router.post('/remove-cart', CartController.removeItem)
router.post('/clear-cart', CartController.clearCart)
router.post('/update', CartController.udpateAmountCart)

module.exports = router
