require('dotenv').config()
// const {APP_PORT} = process.env
const PORT = process.env.PORT || 5000
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyparser.json())
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
const histories = require('./src/routes/histories')
const transactions = require('./src/routes/transactions')
const reviews = require('./src/routes/reviews')

app.use('/books', books)
app.use('/users', users)
app.use('/employes', employes)
app.use('/genres', genres)
app.use('/histories', histories)
app.use('/transactions', transactions)
app.use('/reviews', reviews)

app.get('*', (request,response) => {
    response.status(404).send('Page Not found')
})

app.listen (PORT, () => {
   console.log(`App is listening`)
})