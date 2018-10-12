/**
 * Figure out in which environment we are
 */
//Heroku tells us if we are in production
if (process.env.NODE_ENV === 'production'){
  //We are in production
  module.exports = require('./prod')
} else {
  //We are in dev
  module.exports = require('./dev') //Return dev keys
}
