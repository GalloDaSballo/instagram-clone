const mongoose = require('mongoose')
const Profiles = mongoose.model('profiles')

const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {
  app.get('/api/profiles', requireLogin, async (req,res) => {
    const allProfiles = await Profiles.find({})
    res.send(allProfiles)
  })

  app.get('/api/profiles/:id', async (req,res) => {
    // console.log(req.params.id)
    // console.log(typeof req.params.id)
    const profile = await Profiles.findOne({_user: req.params.id})
    res.send(profile)
  })

  app.post('/api/profiles/:id', requireLogin, async (req, res) => {

    const currentUser = req.user.id //Managed by passport
    console.log(currentUser)
    const requestedUser = req.params.id //The one we request
    console.log(requestedUser)
    const {userName, bio, link, picture} = req.body

    if(currentUser == requestedUser){
      //Can create or edit the profile
      //Check if profile exists -> update
        const profile = await Profiles.findOneAndUpdate(
          {_user: currentUser},
          {_user: currentUser, userName, bio, link, picture})

        res.send(profile)
    } else {
      res.status(401).send({error: `Can't edit a profile you don't own`})
    }
  })
  // app.get('api/users/current')
  //
  // app.post('api/users/new')
}
