require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userController = require('./controllers/user')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ allowedHeaders: '*' }))

app.post('/user/:userid', userController.register)
app.delete('/user/:userid', userController.logout)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
