const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
  try {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const { name, email, password, confirmPassword, phone } = req.body
    const isCheckEmail = reg.test(email)
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Hãy nhập đầy đủ thông tin đăng ký'
      })
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Vui lòng nhập đúng định dạng email'
      })
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Mật khẩu và xác nhận mật khẩu chưa giống nhau'
      })
    }
    const response = await UserService.createUser(req.body)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
const loginUser = async (req, res) => {
  try {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const { email, password } = req.body
    const isCheckEmail = reg.test(email)

    if (!email || !password) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Vui lòng nhập đầy đủ email và mật khẩu'
      })
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Vui lòng nhập đúng định dạng email'
      })
    }
    const response = await UserService.loginUser(req.body)
    const { refresh_token, ...newResponse } = response
    res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: false, samesite: 'strict', path: '/' })
    return res.status(200).json({ ...newResponse, refresh_token })
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const logOutUser = async (req, res) => {
  try {
    res.clearCookie('refresh_token')
    return res.status(200).json({
      status: 'OK',
      message: 'Đăng xuất thành công'
    })
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const updatedUser = async (req, res) => {
  try {
    const userId = req.params.id
    const data = req.body
    if (!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await UserService.updateUser(userId, data)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    if (!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await UserService.deleteUser(userId)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser()
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id
    if (!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await UserService.getDetailsUser(userId)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(' ')[1]
    if (!token) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The token is required'
      })
    }
    const response = await JwtService.refreshTokenJwtService(token)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}

const deleteManyUser = async (req, res) => {
  try {
    const ids = req.body.id
    if (!ids) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The ids is required'
      })
    }
    const response = await UserService.deleteManyUser(ids)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(404).json({ err: err, message: err })
  }
}
module.exports = {
  createUser,
  loginUser,
  updatedUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
  logOutUser,
  deleteManyUser
}
