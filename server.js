// server.js
require('dotenv').config() // **
/* This lets me take the values from my .env file
    and inject them into process.env
    My .env should have a MONGO_URI which will come from my
    MongoDB cloud provider.
*/
require('./config/database') // **
/* running this will connect our database to our MERN app */
const express = require('express')
const app = express()
/* create an application object that we can use to build our
    API that will connect to our React App 
*/
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const PORT = process.env.PORT || 3001

// middleware
app.use(express.json()) //req.body
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/exercises', require('./routes/api/exercises'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`I am listening on ${PORT}. We In the Building.`)
})

// /server.js
// require('dotenv').config()
// require('./config/database');
// const express = require('express')
// const path = require('path')
// const favicon = require('serve-favicon')
// const logger = require('morgan')
// const PORT = process.env.PORT || 3001

// const app = express()

// app.use(express.json())// req.body
// app.use((req, res, next) => {
//     res.locals.data = {}
//     next()
// })
// app.use(logger('dev'))
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico' )))
// app.use(express.static(path.join(__dirname, 'build')))

// app.use(require('./config/checkToken'))
// /*
// app.use('/api', routes) <====== Finish code once you got it
// */
// app.use('/api/users', require('./routes/api/users'))
// app.use('/api/exercises', require('./routes/api/exercises'))

// // const ensureLoggedIn = require('./config/ensureLoggedIn')
// // app.use('/api/exercises', ensureLoggedIn, require('./routes/api/exercises'))
// // app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'))

// app.get('/api/test', (req, res) => {
//     res.json({'eureka': 'you have found it'})
// })

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

// app.listen(PORT, () => {
//     console.log(`I am listening on ${PORT}`)
// })