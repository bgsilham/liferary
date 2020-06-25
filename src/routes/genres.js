const router = require('express').Router()
const genresController = require('../controllers/genres')
const auth = require('../utils/auth')

// router.use(auth)
router.get('/', genresController.getAllGenres)
router.post('/', genresController.createGenre)
router.get('/:id', genresController.getIdGenre)
router.patch('/:id', genresController.updateGenre)
router.delete('/:id', genresController.deleteGenre)

module.exports = router
