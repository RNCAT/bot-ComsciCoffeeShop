const client = require('../models/line')
const cartController = require('./cart')
const message = require('../message')

async function menu(req, res) {
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end()
  }

  if (req.body.events.length === 0) {
    return res.status(200).end()
  }

  const { type, replyToken } = req.body.events[0]
  const { userId } = req.body.events[0].source
  const messageType = req.body.events[0].message.type
  const { text } = req.body.events[0].message

  const menuMessage = {
    type: 'template',
    altText: 'เลือกเมนูกาแฟหรือเบเกอรี่',
    template: {
      type: 'image_carousel',
      columns: [
        {
          imageUrl:
            'https://raw.githubusercontent.com/kesinee-bo/sp01/master/LIFF/ShowCoffeeMenu.png',
          action: {
            type: 'uri',
            label: 'Coffee Menu',
            uri: `https://liff.line.me/${process.env.LIFF_ID_COFFEE}`,
          },
        },
        {
          imageUrl:
            'https://raw.githubusercontent.com/kesinee-bo/sp01/master/LIFF/ShowBakeryMenu.jpg',
          action: {
            type: 'uri',
            label: 'Bakery Menu',
            uri: `https://liff.line.me/${process.env.LIFF_ID_BAKERY}`,
          },
        },
      ],
    },
  }

  switch (type) {
    case 'message':
      switch (messageType) {
        case 'text':
          if (text === 'แสดงเมนูของร้าน') {
            await client.replyMessage(replyToken, menuMessage)
          } else if (text === 'แสดงข้อมูลสินค้าในตระกร้า') {
            const msg = await message.cart_data(cartController.getCart, userId)
            client.replyMessage(replyToken, msg)
          }

          break

        default:
      }

      break
    default:
  }

  return res.sendStatus(200)
}

module.exports = { menu }
