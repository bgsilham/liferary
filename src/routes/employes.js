const router = require('express').Router()
const employesController = require('../controllers/employes')
const auth = require('../utils/auth')

router.get('/', employesController.getAllEmployes)
router.post('/login', employesController.loginEmployee)
router.post('/', auth, employesController.createEmployee)
router.get('/:id', employesController.getIdEmployee)
router.patch('/:id', auth, employesController.updateEmployee)
router.delete('/:id', auth, employesController.deleteEmployee)

module.exports = router
