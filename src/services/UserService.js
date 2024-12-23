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
          message: 'Email này đã có người sử dụng, hãy thay đổi email khác'
        })
      }
      const hash = bcrypt.hashSync(password, 10)

      const createdUser = await User.create({ name, email, password: hash, confirmPassword, phone })
      if (createdUser) {
        resolve({
          status: 'OK',
          message: 'Tạo tài khoản thành công',
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
          message: 'Tài khoản này chưa được đăng ký'
        })
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password)

      if (comparePassword === false) {
        console.log(comparePassword)
        resolve({
          status: 'ERR',
          message: 'Mật khẩu chưa chính xác'
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
          message: 'Tài khoản không tồn tại'
        })
      }

      const updatedUserById = await User.findByIdAndUpdate(id, data, { new: true })

      resolve({
        status: 'OK',
        message: 'Cập nhập thông tin người dùng thành công',
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
          message: 'Tài khoản không tồn tại'
        })
      }

      await User.findByIdAndDelete(id)

      resolve({
        status: 'OK',
        message: 'Xóa người dùng thành công'
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
        message: 'Lấy danh sách người dùng thành công',
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
          message: 'Tài khoản không tồn tại'
        })
      }

      resolve({
        status: 'OK',
        message: 'Lấy thông tin chi tiết người dùng thành công',
        data: user
      })
    } catch (err) {
      reject(err)
    }
  })
}

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids })

      resolve({
        status: 'OK',
        message: 'Xóa người dùng thành công'
      })
    } catch (err) {
      reject(err)
    }
  })
}
module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailsUser, deleteManyUser }
