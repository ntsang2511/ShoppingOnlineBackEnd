require('dotenv').config()

const env = {
  MONGODB_URI: process.env.MONGOO_DB,
  DATABASE_NAME: process.env.DATABASE_NAME,
  LOCAL_DEV_APP_HOST: process.env.LOCAL_DEV_HOST,
  LOCAL_DEV_APP_PORT: process.env.LOCAL_DEV_PORT,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  BUILD_MODE: process.env.BUILD_MODE,
  MAIL_ACCOUNT: process.env.MAIL_ACCOUNT,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  PASSWORD: process.env.PASSWORD,
  USERNAME: process.env.USERNAME,
  AUTHOR: process.env.AUTHOR
}

module.exports = { env }
