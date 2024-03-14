const { Register, Login, Signout } = require("../controllers/authController");
const router = require("express").Router();

router.post('/verifyUser/register', Register);
router.post('/verifyUser/login', Login);
router.get('/verifyUser/signout', Signout);

module.exports = router;
