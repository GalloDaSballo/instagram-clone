const mongoose = require('mongoose')
const Like = mongoose.model('likes') //Class to create an instance of a model
const Picture = mongoose.model('pictures')
const {Schema} = mongoose
const likeF = require('./functions/likeFunctions')
const picF = require('./functions/pictureFunctions')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {
  app.get('/api/likes', async (req,res) => {
    const likes = await likeF.getLikes()
    const users = await likeF.GetUsersThatLikedByLikes(likes)
    const pictures = await likeF.GetPicturesLikedByLikes(likes)
    pictures.forEach(pic => {console.log("In MAIN", pic.image._id)})
    const merged = likeF.MergeLikesWithUsersAndPictures(likes, users, pictures)
    res.send(merged)
    //GetLikes( => likes)
    //GetUsersThatLikedByLikes(likes => profiles)
    //GetPicturesLikedByLikes(likes => pictures + profiles)
    //MergeLikesWithUsersAndPictures(likes, profiles, pictures)
    //return merged
    //Actually need to send the picture and the user as well
  })

  app.post('/api/likes', requireLogin, async (req, res) => {
    //axios.post('api/likes', {pictureId: 421}).then((coso) => console.log(coso))
    let result = null
    try{
      console.log(req.body) //Urlencoded stuff
      const {pictureId} = req.body
      const {id} = req.user

      //Request is proper
      if(!!id && !!pictureId){
        //Like never happened
        const prevLike = await Like.findOne({_user: id, _picture: pictureId})
        console.log(prevLike)
        if(!prevLike){
          const like = new Like({_user: id, _picture: pictureId})
          result = await like.save()
          const pic = await Picture.findOneAndUpdate({_id: pictureId}, {$inc: {'likes' : 1}})
          console.log(result)
          console.log(pic)
        } else {
          //Like already happened
          console.log("Account already created sending back error")
          res.status(429).send("Account already created")
          return
        }
      }
    } catch(err){
      res.status(403).send("Need to Login")
    }
    res.send(result) //Like object if success, null on failure
  })


  app.delete('/api/likes', async (req, res) => {
    //axios.delete('api/likes', {data: {pictureId: 421}}).then((coso) => console.log(coso))

    console.log(req.body) //Urlencoded stuff
    const {pictureId} = req.body
    const {id} = req.user
    console.log(id)
    console.log(pictureId)
    let result = null
    if(!!id && !!pictureId){
      result = await Like.deleteOne({_user: id, _picture: pictureId})
      console.log("result ", result)
      console.log(id, pictureId)
    }
    res.send("Delete Request Processed " + result) //No idea what this is
  })
}
