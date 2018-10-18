//api/users -> //All users NickNames {} //All users
//api/pictures //All pictures (10 at a time, with pagination) //Sorted by most recent
//api/likes //All likes (10 at a time, with pagination) //Sorted by most recent
const index = require('../static/index')
const authRoutes = require('./authRoutes')
const likesRoutes = require('./likesRoutes')
const picturesRoutes = require('./picturesRoutes')
const profilesRoutes = require('./profilesRoutes')
const uploadRoutes = require('./uploadRoutes')
const axios = require('axios')

module.exports = (app) => {
  app.get('/', (req,res) => {
    console.log(req.user)
    res.send(index)
  })

  uploadRoutes(app)
  authRoutes(app)
  likesRoutes(app)
  picturesRoutes(app)
  profilesRoutes(app)
}
