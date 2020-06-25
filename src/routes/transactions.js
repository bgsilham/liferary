const router = require('express').Router()
const transactionsController = require('../controllers/transactions')
const booksController = require('../controllers/books')
const auth = require('../utils/auth')

// router.use(auth)
router.get('/', transactionsController.getAllTransactions)
// router.use(auth)
router.post('/', transactionsController.createTransaction)
router.patch('/penalty/:id', transactionsController.setPenalty)
router.patch('/acc/:id', transactionsController.setAcc)
router.delete('/:id', transactionsController.deleteTransaction)

module.exports = router
