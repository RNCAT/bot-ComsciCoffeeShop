const userController = require('./user')
const client = require('../models/line')

async function genCode() {
  return Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8)
}

async function getReward(req, res) {
  const rewardName = req.body.name
  const rewardPoint = req.body.point
  const userId = req.body.lineId

  await userController.decreaseUserPoint(userId, rewardPoint)

  const rewardCode = await genCode()

  await client.pushMessage(userId, {
    messages: [
      {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'baseline',
          contents: [
            {
              type: 'icon',
              url: 'https://cdn-icons.flaticon.com/png/512/2575/premium/2575375.png?token=exp=1649780977~hmac=f4f6d852e9f93dd05125d8dcec2eeeb5',
              size: 'xxl',
              margin: 'none',
            },
            {
              type: 'text',
              text: rewardName,
              weight: 'bold',
              size: 'xl',
              align: 'center',
            },
            {
              type: 'icon',
              url: 'https://cdn-icons.flaticon.com/png/512/2575/premium/2575375.png?token=exp=1649780977~hmac=f4f6d852e9f93dd05125d8dcec2eeeb5',
              size: 'xxl',
            },
          ],
          backgroundColor: '#D49E7E',
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              type: 'text',
              text: rewardCode,
              align: 'center',
            },
          ],
          flex: 0,
        },
      },
    ],
  })

  return res.status(201).end()
}

module.exports = { getReward, genCode }
