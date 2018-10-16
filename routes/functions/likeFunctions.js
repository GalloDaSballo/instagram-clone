const mongoose = require('mongoose')
const Picture = mongoose.model('pictures') //Class to create an instance of a model
const {Schema} = mongoose
const Profiles = mongoose.model('profiles')
const Like = mongoose.model('likes')
const _ = require('lodash')
const picF = require('./pictureFunctions')

module.exports.getLikes = async () => {
  const allLikes = await Like.find({}).sort({date:-1})
  return allLikes
}


module.exports.GetUsersThatLikedByLikes = async (likes) => {
  // console.log("GetUsersThatLikedByLikes")
  //Returns the profile info of the users that generated the like
  const allIds = likes.map(like => {
    return(like._user.toString())
  })
  const trimmedIds = _.uniq(allIds)

  const profiles = await Promise.all(trimmedIds.map(async (id) => {
    //We need Promise.all to check for promises inside the array
    const profile = await Profiles.findOne({_id: id})
    // console.log("Profile ", profile)
    // console.log("inside map")
    return profile
  }))
  // console.log("GetUsersThatLikedByLikes ", profiles)
  return profiles
}

module.exports.GetPicturesLikedByLikes = async (likes) => {
  // console.log("GetPicturesLikedByLikes")
  const allPics = await Promise.all(likes.map(async like => {
    return await Picture.findOne({_id: like._picture})
  }))
  // console.log("All Pics ", allPics)

  //I need to get all the picture objcts and send them
  const profiles = await picF.getProfilesbyPicsId(allPics)
  const picAndProfiles = picF.mergeIntoPicAndProfileObject(allPics, profiles)
  return picAndProfiles
}


module.exports.MergeLikesWithUsersAndPictures = (likes, profiles, pictures) => {
  // console.log("MergeLikesWithUsersAndPictures")
  let coso = []
  likes.forEach(like => {
    const like_user_id = like._user
    const like_picture_id = like._picture

    const profileObj = _.find(profiles, {'_id': like_user_id}) //The profile that created the picture
    // console.log("Profile OBK", profileObj)
    // let pictureObj = _.find(pictures, {'.image._id': like_picture_id}) //.find doesn0t seem to go 2 levels deep
    let found = false
    let i = 0
    while(!found && i < pictures.length){
      if(pictures[i].image._id == like_picture_id) {
        found = true
        pictureObj = pictures[i]
        // console.log("FOUND FOUND")
      }
      i++
    }
    // console.log("pictureObj", pictureObj)
    let obj = {}
    obj.picture = pictureObj
    obj.user = profileObj
    obj.like = like
    console.log(obj)
    coso.push(obj)
  })
  return coso
}
