const multer = require('multer')

 const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime().toString().concat('_').concat(file.originalname))
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true)  
    } else {
        cb(('Only image are allowed!'), false)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
 })

module.exports = upload