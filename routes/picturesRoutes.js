module.exports = (app) => {
  app.get('/api/pictures', (req,res) => {
    res.send("Pictures Here")
  })
}
