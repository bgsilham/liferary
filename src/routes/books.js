const router = require('express').Router()
const booksController = require('../controllers/books')
const upload = require('../utils/upload')
const auth = require('../utils/auth')

router.use(auth)
router.get('/', booksController.getAllBooks)
router.use(auth)
router.post('/', upload.single('picture'), booksController.createBook)
router.patch('/:id', upload.single('picture'), booksController.updateBook)
router.delete('/:id', booksController.deleteBook)

module.exports = router
