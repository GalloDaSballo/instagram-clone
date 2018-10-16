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

    const currentUser = req.user.id
    console.log(currentUser)
    const requestedUser = req.params.id
    console.log(requestedUser)
    const {userName, bio, link, picture} = req.body

    if(currentUser == requestedUser){
      //Can create or edit the profile
      //Check if profile exists -> update
      const profile = await Profiles.findOne({_user: currentUser})

      //TODO: As of now we allow pictures to come from anyplace in the world

      if(!!profile){
        //Update
        console.log("Profile is being Updated")
        const profile = await Profiles.updateOne({_user: currentUser, userName, bio, link, picture})
        res.send(profile)
      } else {
        //Create
        console.log("Profile is being created")
        const profile = await Profiles.create({_user: currentUser, userName, bio, link, picture})
        res.send(profile)
      }
    } else {
      res.status(401).send({error: `Can't edit a profile you don't own`})
    }
  })
  // app.get('api/users/current')
  //
  // app.post('api/users/new')
}
