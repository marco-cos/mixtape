const { review, Like, getReview, getUserReviews } = require('../controllers/reviewController');
const router = require('express').Router();

router.post('/', review);
router.put('/:id/like', Like);
router.get('/:id', getReview);
router.get('/profile/:username', getUserReviews);

module.exports = router;