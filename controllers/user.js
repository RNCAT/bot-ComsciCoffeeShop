const db = require('../models/firebase')
const client = require('../models/line')

async function register(req, res) {
  const userID = req.params.userid
  const { lineId, lineName, firstName, lastName, phone, address } = req.body
  const userPath = `/Users/${userID}`

  const registeredRichMenu = process.env.RICHMENU_ID

  const users = db.ref(userPath)
  if (!users) return res.send(`Can't connect users path`)

  try {
    await users.update({ lineId, lineName, firstName, lastName, phone, address })

    await client.linkRichMenuToUser(userID, registeredRichMenu)

    return res.status(200).end()
  } catch (error) {
    return res.send(`Data could not be saved. ${error}`)
  }
}

async function logout(req, res) {
  const userID = req.params.userid

  try {
    await client.unlinkRichMenuFromUser(userID)

    return res.status(200).end()
  } catch (error) {
    return res.send(`Can't logout. ${error}`)
  }
}

module.exports = { register, logout }
