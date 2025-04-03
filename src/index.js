const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { corsOptions } = require('./config/corsOptions')
const { env } = require('./config/environment')
dotenv.config()
const app = express()
const port = env.BUILD_MODE === 'dev' ? env.LOCAL_DEV_APP_PORT : process.env.PORT

app.get('/', (req, res) => {
  return res.send('Hello world ád')
})
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

routes(app)

mongoose
  .connect(`${env.MONGODB_URI}`)
  .then(() => {
    console.log('Connect DB success')
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log('Server is running in port: ', +port)
})
