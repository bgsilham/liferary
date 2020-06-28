const router = require('express').Router()
const historiesController = require('../controllers/histories')
const auth = require('../utils/auth')

router.get('/', historiesController.getAllHistories)
router.post('/', auth, historiesController.createHistory)
router.post('/user', historiesController.getHistoriesById)
router.patch('/:id', historiesController.updateHistory)
router.delete('/', auth, historiesController.deleteHistory)

module.exports = router
