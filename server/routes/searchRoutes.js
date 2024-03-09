const router = require("express").Router();
const { Search } = require("../controllers/searchController");

router.post('/', Search);

module.exports = router;
