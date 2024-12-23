const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()
const sendEmailCreateOrder = async (email, orderItems) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let listItem = ''
  const attachImage = []
  orderItems.forEach((order) => {
    listItem += `<div>Bạn đã đặt thành công sản phẩm <b>${order.name}</b> với số lượng là <b>${order.amount}</b> và giá là: <b>${order.price}</b></div>`
    attachImage.push({ path: order.image })
  })

  const info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: 'nts25112003@gmail.com', // list of receivers
    subject: 'Cảm ơn bạn đã đặt hàng tại shop', // Subject line
    text: 'Hello world?', // plain text body
    html: `<div>${listItem}</div>`, // html body
    attachments: attachImage
  })
}

module.exports = { sendEmailCreateOrder }
