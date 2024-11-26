const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleware, authUserMiddleware } = require('../middlewares/authMiddleware')
router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logOutUser)
router.put('/update-user/:id', authMiddleware, userController.updatedUser)
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser)
router.get('/get-all', authMiddleware, userController.getAllUser)
router.get('/get-details/:id', authUserMiddleware, userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/delete-many', authMiddleware, userController.deleteManyUser)

module.exports = router
