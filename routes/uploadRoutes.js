var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (app) => {
    app.post('/api/upload', upload.single('imageUpload'), (req, res) => {
    const file = req.file
    const imageUrl = "/" + req.file.path.toString()
    console.log("Successo Upload")
    res.status(200).send(imageUrl)
    })
    //NOTE: We do not check if the file upload has a matching picture entry in the db.
    //NOTE: This should be done via a cron that checks regularly and eliminates files
}
