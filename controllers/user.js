const db = require('../models/firebase')
const client = require('../models/line')

async function register(req, res) {
  const userID = req.params.userid
  const { lineId, lineName, firstName, lastName, phone, address } = req.body
  const userPath = `/Users/${userID}`

  console.log(req.body)

  const registeredRichMenu = process.env.RICHMENU_ID

  const users = db.ref(userPath)
  if (!users) return res.send(`Can't connect users path`)

  try {
    await users.update({ lineId, lineName, firstName, lastName, phone, address, point: 0 })

    await client.linkRichMenuToUser(userID, registeredRichMenu)

    return res.status(200).end()
  } catch (error) {
    console.log(error)
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

async function getUserPoint(userID) {
  const userPath = `/Users/${userID}`

  const users = db.ref(userPath)

  const snapshot = await users.once('value')
  const { point } = await snapshot.val()

  return { users, point }
}

async function getUserPoints(req, res) {
  const { userid } = req.params
  const { point } = await getUserPoint(userid)

  return res.status(200).json({ point })
}

async function increaseUserPoint(userID, newPoint) {
  const { users, point } = await getUserPoint(userID)

  const latestPoint = point + Number(newPoint)

  try {
    await users.update({ point: latestPoint })
  } catch (error) {
    console.log(error)
  }
}

async function decreaseUserPoint(userID, newPoint) {
  const { users, point } = await getUserPoint(userID)

  const latestPoint = point - Number(newPoint)

  try {
    await users.update({ point: latestPoint })
  } catch (error) {
    console.log(error)
  }
}
module.exports = { register, logout, getUserPoints, increaseUserPoint, decreaseUserPoint }
