const router = require('express').Router()
const booksController = require('../controllers/books')
const auth = require('../utils/auth')

router.get('/', booksController.getAllBooks)
router.post('/', booksController.createBook)
router.patch('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook)

module.exports = router
