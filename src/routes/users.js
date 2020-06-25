const router = require('express').Router()
const usersController = require('../controllers/users')
const auth = require('../utils/auth')


// router.use(auth)
router.get('/', usersController.getAllUsers)
// router.use(auth)
router.post('/login', usersController.loginUser)
router.post('/', usersController.createUser)
router.get('/:id', usersController.getIdUser)
router.patch('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router
