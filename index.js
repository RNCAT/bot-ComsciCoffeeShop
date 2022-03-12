require('dotenv').config()
const express = require('express')
const cors = require('cors')

const userController = require('./controllers/user')
const botController = require('./controllers/bot')
const productController = require('./controllers/product')
const cartController = require('./controllers/cart')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/user/:userid', userController.register)
app.delete('/user/:userid', userController.logout)

app.post('/bot', botController.menu)

app.get('/products/:userId', productController.getProducts)
app.post('/cart', cartController.addCart)
app.delete('/cart', cartController.deleteCart)

app.listen(port, () => console.log(`listening at http://localhost:${port}`))
