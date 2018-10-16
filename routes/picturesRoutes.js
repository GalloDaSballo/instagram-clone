const mongoose = require('mongoose')
const Picture = mongoose.model('pictures') //Class to create an instance of a model
const {Schema} = mongoose
const Profiles = mongoose.model('profiles')
const picF = require('./functions/pictureFunctions')
const _ = require('lodash')



module.exports = (app) => {
  app.get('/api/pictures', async (req,res) => {
    const pics = await picF.getPics()
    const profiles = await picF.getProfilesbyPicsId(pics)
    const result = await picF.mergeIntoPicAndProfileObject(pics, profiles)
    res.send(result)
  })

  // app.get('/api/pictures/mine', requireLogin, async (req,res) => {
  //   const userId = req.user.id
  //   console.log(userId)
  //   const profiles = await picF.getProfilesbyPicsId(pics)
  //   const result = await picF.mergeIntoPicAndProfileObject(pics, profiles)
  //   res.send(result)
  // })

  app.get('/api/pictures/:id', async (req, res) => {
    const picture = await Picture.findOne({_id: req.params.id})
    console.log(req.params.id)
    console.log("Picture ", picture)
    res.send(picture)
  })

  app.post('/api/pictures', async (req, res) => {
    // axios.post('api/pictures',
    // {pictureUrl: '123.com', description: 'Mona Lisa'})
    // .then((coso) => console.log(coso))
    console.log(req.body) //Urlencoded stuff
    const {id} = req.user
    const {pictureUrl} = req.body
    let {description} = req.body
    if(!description)
      description = ''
    let result = null
    //Request is proper
    if(!!id && !!pictureUrl){
      console.log("Verra Inserito?")
      //Like never happened
      const prevPic = await Picture.findOne({_user: id, pictureUrl, description})
      // console.log(prevPic)
      if(!prevPic){
        const pic = new Picture({
          _user: id,
          pictureUrl,
          description
        })
        result = await pic.save()
        console.log(result)
      } else {
        //Like already happened
        console.log("Picture Already Uploaded")
        res.status(429).send("Picture Already Uploaded")
        return
      }
    }
    res.send(result) //Like object if success, null on failure
  })

  app.delete('/api/pictures', async (req, res) => {
    // axios.delete('api/pictures',
    // {data : {pictureUrl: '123.com', description: 'Mona Lisa'}})
    // .then((coso) => console.log(coso))

    console.log(req.body) //Urlencoded stuff
    const {id} = req.user
    const {pictureUrl, description} = req.body
    let result = null
    //We probably want to use mongoose unique id rather than all this data but w/e
    if(!!id && !!pictureUrl, description){
      result = await Picture.deleteOne({_user: id, pictureUrl, description})
      console.log("result ", result)
      console.log(id, pictureUrl, description)
    }
    res.send("Delete Request Processed " + result) //No idea what this is
  })
}
