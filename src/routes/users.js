const router = require('express').Router()
const usersController = require('../controllers/users')
const auth = require('../utils/auth')


router.get('/login', usersController.loginUser)
router.use(auth)
router.get('/', usersController.getAllUsers)
router.use(auth)
router.post('/', usersController.createUser)
router.use(auth)
router.patch('/:id', usersController.updateUser)
router.use(auth)
router.delete('/:id', usersController.deleteUser)

module.exports = router
