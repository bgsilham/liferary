const router = require('express').Router()
const genresController = require('../controllers/genres')
const auth = require('../utils/auth')

router.get('/', genresController.getAllGenres)
router.post('/', auth, genresController.createGenre)
router.get('/:id', genresController.getIdGenre)
router.patch('/:id', auth, genresController.updateGenre)
router.delete('/:id', auth, genresController.deleteGenre)

module.exports = router
