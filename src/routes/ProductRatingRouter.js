const express = require('express')
const router = express.Router()
const ProductRatingController = require('../controllers/ProductRatingController')
const { authMiddleware } = require('../middlewares/authMiddleware')
router.post('/create', ProductRatingController.createProductRating)
router.put('/update', ProductRatingController.editProductRating)
router.get('/get-product-rating/:name', ProductRatingController.getProductRating)
router.delete('/delete/:id', ProductRatingController.deleteproductRating)

module.exports = router
