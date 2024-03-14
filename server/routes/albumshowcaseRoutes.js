const router = require("express").Router();
const { main} = require("../controllers/albumshowcaseController");
router.post('/', main);

module.exports = router;
