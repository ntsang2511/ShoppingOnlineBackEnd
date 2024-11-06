const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()
const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
  return res.send('Hello world ád')
})
app.use(cors())
app.use(bodyParser.json())
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
