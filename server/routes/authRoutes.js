const { Register, Login, Signout } = require("../controllers/authController");
// const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post('/verifyUser/register', Register);
router.post('/verifyUser/login', Login);
// router.post('/verifyUser', userVerification);
router.get('/verifyUser/signout', Signout);

// router.get('/verifyUser/isProtected', isSignedIn, (req, res) => {
//     res.send('A protected route');
// });

module.exports = router;
