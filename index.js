require('dotenv').config()
const {APP_PORT} = process.env
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use('/img', express.static('uploads'))

app.get('/',(request,response) => {
    response.send('Server accessed')
})

//import 
const books = require('./src/routes/books')
const users = require('./src/routes/users')
const employes = require('./src/routes/employes')
const genres = require('./src/routes/genres')
const transactions = require('./src/routes/transactions')

app.use('/books', books)
app.use('/users', users)
app.use('/employes', employes)
app.use('/genres', genres)
app.use('/transactions', transactions)

app.get('*', (request,response) => {
    response.status(404).send('Page Not found')
})

app.listen (APP_PORT, () => {
   console.log(`App is listen in ${APP_PORT} port`)
})