const router = require("express").Router();
const { Albumpage } = require("../controllers/albumpageController");
router.post('/', Albumpage);

module.exports = router;
