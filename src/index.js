const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()
const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
  return res.send('Hello world ád')
})
// app.use(express.json({ limit: '50mb' })) // Tăng giới hạn lên 10MB
// app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
routes(app)

mongoose
  .connect(`${process.env.MONGOO_DB}`)
  .then(() => {
    console.log('Connect DB success')
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log('Server is running in port: ', +port)
})
