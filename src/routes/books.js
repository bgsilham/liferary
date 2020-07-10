const router = require('express').Router()
const booksController = require('../controllers/books')
const auth = require('../utils/auth')

router.get('/', booksController.getAllBooks)
router.get('/latest', booksController.getLatestBooks)
router.get('/author', booksController.getAuthorBooks)
router.get('/:id', booksController.getIdBook)
router.get('/genre/:genre', booksController.getBookByGenre)
router.post('/', booksController.createBook)
router.patch('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook)

module.exports = router
