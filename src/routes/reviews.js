const router = require('express').Router()
const reviewsController = require('../controllers/reviews')
const auth = require('../utils/auth')

router.get('/', reviewsController.getAllReviews)
router.post('/', auth, reviewsController.createReview)
router.get('/:user_id', reviewsController.getReviewUser)
router.patch('/:id', auth, reviewsController.updateReview)
router.delete('/:id', auth, reviewsController.deleteReview)

module.exports = router
