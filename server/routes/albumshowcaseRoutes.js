const router = require("express").Router();
const { main} = require("../controllers/albumshowcaseController");
console.log("IN ROUT$es")
router.post('/', main);

module.exports = router;
