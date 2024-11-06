const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generalAcessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      payload
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: '30s' }
  )
  return access_token
}
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      payload
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: '365d' }
  )
  return refresh_token
}
const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: 'Err',
            message: 'the authentication token'
          })
        }

        const { payload } = user
        const access_token = await generalAcessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin
        })

        resolve({
          status: 'OK',
          message: 'SUCESSFULLY',
          access_token
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}
module.exports = {
  generalAcessToken,
  generalRefreshToken,
  refreshTokenJwtService
}
