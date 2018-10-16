var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = (app) => {
    app.post('/api/upload', upload.single('imageUpload'), (req, res) => {
    // console.log("API UPLOAD")
    // console.log(req.body)
    // console.log(req.file)
    const file = req.file

    const imageUrl = "/" + req.file.path.toString()

    // if(file){
    //   console.log(file)
    //   //Publitio doesn0t seem to work....
    //   // create (upload) local file, simple
    //   publitio.uploadFile(imageUrl, 'file')
    //       .then((data) => { console.log(data) })
    //       .catch((error) => { console.log(error) })
    // }
    console.log("Successo Upload")
    res.status(200).send(imageUrl)
    })
}
