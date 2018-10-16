/**
 * Users Profiles
 */
const mongoose = require('mongoose')
const {Schema} = mongoose //Schema = mongoose.Schema

const profilesSchema = new Schema({
  _user: String,
  userName: String,
  bio: String,
  link: String,
  picture: String
})

//Creates a collection called users wioth the userSchema
mongoose.model('profiles', profilesSchema)
//We will be able to change the schema without issues
