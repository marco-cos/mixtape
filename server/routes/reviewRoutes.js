const express = require('express');
const router = express.Router();
const { createReview, like, getAllReviews, getUserReviews, comment} = require('../controllers/reviewController');

router.route('/:username/createReview').get(createReview);

router.route('/:reviewId/like').put(like);

router.route('/reviews').get(getAllReviews);

router.route('/:username/myReviews').get(getUserReviews);

router.route('/comment').post(comment);

module.exports = router;
const { review,Like,getReview,getUserReviews } = require("../controllers/reviewController");

// Route for creating a new review
router.post('/', review);

// Route for liking/unliking a review
router.put('/:id/like', Like);

// Route for retrieving a specific review by its ID
router.get('/:id', getReview);

// Route for retrieving reviews by a specific user
router.get('/user/:id', getUserReviews);

module.exports = router;
