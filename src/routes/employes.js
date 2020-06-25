const router = require('express').Router()
const employesController = require('../controllers/employes')

router.get('/', employesController.getAllEmployes)
router.post('/login', employesController.loginEmployee)
router.post('/', employesController.createEmployee)
router.get('/:id', employesController.getIdEmployee)
router.patch('/:id', employesController.updateEmployee)
router.delete('/:id', employesController.deleteEmployee)

module.exports = router
