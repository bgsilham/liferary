const router = require('express').Router()
const transactionsController = require('../controllers/transactions')
const booksController = require('../controllers/books')
const auth = require('../utils/auth')

router.get('/', transactionsController.getAllTransactions)
router.get('/user/:user_id', transactionsController.getTransactionByUser)
router.post('/', auth, transactionsController.createTransaction)
router.patch('/penalty/:id', auth, transactionsController.setPenalty)
router.patch('/acc/:id', auth, transactionsController.setAcc)
router.delete('/:id', auth, transactionsController.deleteTransaction)

module.exports = router
