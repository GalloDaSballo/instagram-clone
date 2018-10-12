module.exports = (app) => {
  app.get('/api/likes', (req,res) => {
    res.send("Likes Here")
  })
}
