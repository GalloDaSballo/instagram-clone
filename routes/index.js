//api/users -> //All users NickNames {} //All users
//api/pictures //All pictures (10 at a time, with pagination) //Sorted by most recent
//api/likes //All likes (10 at a time, with pagination) //Sorted by most recent
const index = require('../static/index')
const authRoutes = require('./authRoutes')
const likesRoutes = require('./likesRoutes')
const picturesRoutes = require('./picturesRoutes')
const usersRoutes = require('./usersRoutes')

console.log(index)
module.exports = (app) => {
  app.get('/', (req,res) => {
    res.send(index)
  })

  authRoutes(app)

  likesRoutes(app)

  picturesRoutes(app)
  
  usersRoutes(app)
}
