const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleware, authUserMiddleware } = require('../middlewares/authMiddleware')
router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.put('/update-user/:id', userController.updatedUser)
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser)
router.get('/get-all', authMiddleware, userController.getAllUser)
router.get('/get-details/:id', authUserMiddleware, userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)

module.exports = router
