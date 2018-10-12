const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')

require('./models/users')


mongoose.connect(keys.mongoURI)

const app = express()
app.use(bodyParser.json()) //req.body will be available in any post route
//Tell the app to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
    keys: [keys.cookieKey] //to encrypt the cookie
  })
)
require('./services/passport')
app.use(passport.initialize())
app.use(passport.session())


require('./routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
