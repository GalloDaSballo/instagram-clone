const passport = require('passport')

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] //The stuff we want
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/')
    }
  )

  app.get('/api/logout', (req, res) => {
    req.logout() //automatically given by passport
    //Kills the cookie and logs out the user
    res.redirect('/')
  })
  app.get('/api/current_user', (req, res) => {
    //res.send(req.session) //Show us the user that is logged in
    res.send(req.user)
  })
}
