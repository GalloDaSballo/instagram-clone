/**
 * Passport.js configuration written using async await
 */
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users') //This way we get the Users Model

passport.serializeUser((user, done) => {
  //user is the ModelInstance mongoose returns
  //@param1 -> erro object
  //@param2 -> the unique identifier that mongoDb is using to identify the user
  done(null, user.id) //done is a callback we have to call when we have finished
  //user.id is a shortcut to get that weird __id parameter
  //Basically passport will put the user.id data in the cookie and guarantee the authentication
})

passport.deserializeUser( async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
  //findById -> the __id of the record
})
//https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin
//Tells passport we can use google and tells it to use it
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', //URL where we handle the google response
    proxy: true //if we go through proxy, keep https
  },
  //This is the onSuccess
  async (accessToken, refreshToken, profile, done) => {
    //AccessToken represent the original approval of our permission to edit / use the google data
    //Refreshtoken makes the accessToken work again
    console.log('accessToken ', accessToken) //When success we will log the accessToken
    console.log('refresh token ', refreshToken)
    console.log('profile ', profile) //All the profile info

    const existingUser = await User.findOne({googleId: profile.id}) //Check if it exists with the same profile.id
    if(existingUser){
      //We found a user
      console.log("Already have user")
      done(null, existingUser)
    } else {
      //We create a new modelInstance then we save it and then we call done to it
      const user = await new User({googleId: profile.id}).save() //this is the model instance. We need to send it to the collection
      done(null, user)
    }
  }
))
