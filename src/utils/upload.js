const multer = require('multer')

 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads')
   },
   filename: function (req, file, cb) {
     cb(null, new Date().getTime().toString().concat('_').concat(file.originalname))
   },

 })

 const fileFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, true)  
  } else {
      cb(('Only image are allowed!'), false)
  }
}
module.exports = upload = multer({ 
  storage:  storage, 
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter
})
