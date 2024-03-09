const { Register, Login } = require("../controllers/authController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/', userVerification)

module.exports = router;
