const mongoose = require('mongoose')
const Picture = mongoose.model('pictures') //Class to create an instance of a model
const {Schema} = mongoose
const Profiles = mongoose.model('profiles')
const _ = require('lodash')

module.exports.getPics = async () => {
  const res = await Picture.find({}).sort({date:-1})
  return res
}

module.exports.getProfilesbyPicsId = async (allPics) => {
  // console.log("getProfilesbyPicsId")
  // console.log("AllPICS FROM LIKEFUNCTION ", allPics)
  let allIds
  allIds = allPics.map(pic => {
    return(pic._user.toString())
  })

  const trimmedIds = _.uniq(allIds)
  const profiles = await Promise.all(trimmedIds.map(async (id) => {
    //We need Promise.all to check for promises inside the array
    const profile = await Profiles.findOne({_id: id})
    // console.log("Profile ", profile)
    // console.log("inside map")
    return profile
  }))
  // console.log("getAuthorsbyPicsId ", profiles)
  return profiles
}


module.exports.mergeIntoPicAndProfileObject = async (pics, authors) => {
  // console.log("mergeIntoPicAndProfileObject")
  let coso = []
  pics.forEach(pic => {
    const pic_user_id = pic._user
    const profileObj = _.find(authors, {'_id': pic_user_id}) //The profile that created the picture
    let obj = {}
    obj.image = pic
    obj.profile = profileObj
    coso.push(obj)
  })
  return coso
}
