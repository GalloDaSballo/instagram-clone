/**
 * Google Login
 */
const mongoose = require('mongoose')
const {Schema} = mongoose //Schema = mongoose.Schema

const userSchema = new Schema({
  googleId: String,
})

//Creates a collection called users wioth the userSchema
mongoose.model('users', userSchema)
//We will be able to change the schema without issues
