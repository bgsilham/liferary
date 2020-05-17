const router = require('express').Router()
const employesController = require('../controllers/employes')

router.get('/', employesController.getAllEmployes)
router.get('/login', employesController.loginEmployee)
router.post('/', employesController.createEmployee)
router.patch('/:id', employesController.updateEmployee)
router.delete('/:id', employesController.deleteEmployee)

module.exports = router
