const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { generalAcessToken, generalRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser

    try {
      const checkUser = await User.findOne({
        email: email
      })
      if (checkUser !== null) {
        resolve({
          status: 'ERR',
          message: 'The email is already in the account'
        })
      }
      const hash = bcrypt.hashSync(password, 10)

      const createdUser = await User.create({ name, email, password: hash, confirmPassword, phone })
      if (createdUser) {
        resolve({
          status: 'OK',
          message: 'success',
          data: createdUser
        })
      }
    } catch (err) {
      reject(err)
    }
  })
}
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin

    try {
      const checkUser = await User.findOne({
        email: email
      })
      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password)

      if (!comparePassword) {
        resolve({
          status: 'ERR',
          message: 'The password or user is incorrect'
        })
      }

      const access_token = await generalAcessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin
      })

      const refresh_token = await generalRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin
      })

      checkUser.access_token = access_token
      checkUser.refresh_token = refresh_token
      await checkUser.save()

      resolve({
        status: 'OK',
        message: 'success',
        access_token,
        refresh_token
      })
    } catch (err) {
      reject(err)
    }
  })
}
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id
      })

      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }

      const updatedUserById = await User.findByIdAndUpdate(id, data, { new: true })

      resolve({
        status: 'OK',
        message: 'success',
        data: updatedUserById
      })
    } catch (err) {
      reject(err)
    }
  })
}

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id
      })

      if (checkUser === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }

      await User.findByIdAndDelete(id)

      resolve({
        status: 'OK',
        message: 'Delete user sucessfully'
      })
    } catch (err) {
      reject(err)
    }
  })
}

const getAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find()

      resolve({
        status: 'OK',
        message: 'Get all user sucessfully',
        data: allUser
      })
    } catch (err) {
      reject(err)
    }
  })
}

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id
      })
      if (user === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined'
        })
      }

      resolve({
        status: 'OK',
        message: 'Get details success',
        data: user
      })
    } catch (err) {
      reject(err)
    }
  })
}
module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailsUser }
