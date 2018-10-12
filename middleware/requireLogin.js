module.exports = (req, res, next) => {
  //Next is the callback we will call when we are done
  if(!req.user){
    return res.status(401).send({error: 'You must log in!'})
  }
  //If the user is not logged in we kill the operation and do not call next
  next() //Next is called in the other case
}
