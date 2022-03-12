/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
const db = require('../models/firebase')

async function addCart(req, res) {
  const userId = req.body.lineId
  const itemAdd = req.body.data

  const type = itemAdd.coffeeId === undefined ? 'bakeries' : 'coffees'

  try {
    const cartPath = `/Cart/${userId}/${type}/`
    const cartdb = db.ref(cartPath)

    cartdb.once('value', (snapshot) => {
      const cart = snapshot.val()
      let index

      if (cart) {
        // Check if not empty cart

        if (type === 'coffees') {
          Object.keys(cart).map((key) =>
            cart[key].coffeeId === itemAdd.coffeeId &&
            cart[key].sweet === itemAdd.sweet &&
            cart[key].type === itemAdd.type
              ? (index = key)
              : 0
          )
        } else {
          Object.keys(cart).map((key) =>
            cart[key].bakeryId === itemAdd.bakeryId ? (index = key) : 0
          )
        }
      }

      // Update cart (item exist)
      if (index !== undefined) {
        const cartPath = `/Cart/${userId}/${type}/${index}/`
        const cartdb = db.ref(cartPath)

        cartdb.update(
          {
            qty: cart[index].qty + 1,
          },
          (error) => {
            if (error) {
              res.send(`Data could not be saved.${error}`)
            } else {
              return res.status(201).send({ error: false, message: 'item updated!' })
            }
          }
        )
      } else {
        // Add new item to cart

        const cartPath = `/Cart/${userId}/${type}/`
        const cartdb = db.ref(cartPath)
        itemAdd.qty = 1
        cartdb.push(itemAdd, (error) => {
          if (error) {
            res.send(`Data could not be saved.${error}`)
          } else {
            return res.status(201).send({ error: false, message: 'item added!' })
          }
        })
      }
    })
  } catch (err) {
    return res.status(404).send({ error: false, message: 'fail to add item!' })
  }
}

async function deleteCart(req, res) {
  const userId = req.body.lineId
  const itemDel = req.body.data

  const type = itemDel.coffeeId === undefined ? 'bakeries' : 'coffees'

  try {
    const cartPath = `/Cart/${userId}/${type}/`
    const cartdb = db.ref(cartPath)

    cartdb.once('value', async (snapshot) => {
      const cart = snapshot.val()
      let index

      if (type === 'coffees') {
        index = Object.keys(cart).map((key) =>
          !(cart[key] === undefined) && cart[key].coffeeId === itemDel.coffeeId ? key : undefined
        )
      } else {
        index = Object.keys(cart).map((key) =>
          !(cart[key] === undefined) && cart[key].bakeryId === itemDel.bakeryId ? key : undefined
        )
      }

      index.forEach(async (indx) => {
        if (indx !== undefined) {
          const cartPath = `/Cart/${userId}/${type}/${indx}/`
          const cartdb = db.ref(cartPath)
          await cartdb.remove()
        }
      })

      return res.status(200).send({ error: false, message: 'item deleted!' })
    })
  } catch (err) {
    return res.status(404).send({ error: false, message: 'fail to delete item!' })
  }
}

module.exports = {
  addCart,
  deleteCart,
}
