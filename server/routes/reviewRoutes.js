const express = require('express');
const router = express.Router();
const { createReview, like, getAllReviews, getUserReviews, comment} = require('../controllers/reviewController');

router.route('/:username/createReview').get(createReview);

router.route('/:reviewId/like').put(like);

router.route('/reviews').get(getAllReviews);

router.route('/:username/myReviews').get(getUserReviews);

router.route('/comment').post(comment);

module.exports = router;