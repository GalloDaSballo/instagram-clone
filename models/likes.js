/**
 * Pictures, simple association with user + link to picture + descrption
 */
const mongoose = require('mongoose')
const {Schema} = mongoose //Schema = mongoose.Schema

const likeSchema = new Schema({
  date: {type: Date, default: Date.now()},
  _user: {type: Schema.Types.ObjectId, ref: 'User'}, //The user
  _picture: {type: String} //ref to picture
})


mongoose.model('likes', likeSchema)
