/**
 * Pictures, simple association with user + link to picture + descrption
 */
const mongoose = require('mongoose')
const {Schema} = mongoose

const pictureSchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'}, //The user
  pictureUrl: String,
  description: String,
  date: {type: Date, default: Date.now()},
  likes: {type: Number, default: 0}
})


mongoose.model('pictures', pictureSchema)
