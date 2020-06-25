const router = require('express').Router()
const historiesController = require('../controllers/histories')
const auth = require('../utils/auth')

// router.use(auth)
router.get('/', historiesController.getAllHistories)
// router.use(auth)
router.post('/', historiesController.createHistory)
router.post('/user', historiesController.getHistoriesById)
router.patch('/:id', historiesController.updateHistory)
router.delete('/', historiesController.deleteHistory)

module.exports = router
