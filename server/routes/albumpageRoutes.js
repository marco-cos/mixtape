const router = require("express").Router();
const { getalbuminf ,unlike, like} = require("../controllers/albumpageController");
router.post('/getalbuminf', getalbuminf);
router.put('/unlike', unlike);
router.put('/like', like);

module.exports = router;
