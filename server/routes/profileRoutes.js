const express = require('express');
const router = express.Router();
const { getProfileFromId, getProfileFromUsername, updateBio, followUser, unfollowUser, getFollowers, updateProfilePic, checkSameUser } = require('../controllers/profileController');
// const { userVerification } = require('../middlewares/authMiddleware');

router.route('/').get(getProfileFromId);

router.route('/:username').get(getProfileFromUsername);

router.route('/:targetUser/follow').get(followUser);

router.route('/:targetUser/unfollow').get(unfollowUser)

router.route('/:username/updateBio').put(updateBio);

router.route('/followers/:username').get(getFollowers);

router.route('/:username/updatePic').put(updateProfilePic);

router.route('/:username/checkSame').get(checkSameUser);

module.exports = router;

//const {registerUser} = require('../controllers/authController')
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const fs = require('fs');



// const upload = multer({ dest: 'uploads/'});

// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ error: 'Token required'});
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: 'Invalid token'});
//         }
//         req.userId = decoded.userId;
//         next();
//     });
// };

// router.use(verifyToken);


// //profile picture endpoint
// router.post('/upload', upload.single('profilePicture'), async (req, res) => {
//    try {
//     const userId = req.userId;
//     const profilePictureData = fs.readFileSync(req.file.path);
    
//     const user = await UserModel.findById(userId);

//     if (!user) {
//         return res.status(404).json({ error: 'User not found'});
//     }

//     if (user._id.toString() !== userId) {
//         return res.status(401).json({ error: 'Unauthorized access'});
//     }

//     user.profilePicture = {
//         data: profilePictureData,
//         contentType: req.file.mimetype
//     };
//     const savedUser = await user.save();

//     fs.unlinkSync(req.file.path);

//     res.json({success: true, user: savedUser});

//    } catch (error) {
//     console.error('Error uploading picture');
//     res.status(500).json({ error: 'Error uploading picture'});
//    }
//   });

//   //bio, favorites endpoint
//   router.post("/updateExtraInfo", async (req,res) => {
//     try {
//         const userId = req.userId;
//         const {bio, favArtist, favAlbum, favSong} = req.body;
        
//         const user = await UserModel.findById(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found'});
//         }

//         if (user._id.toString() !== userId) {
//             return res.status(401).json({ error: 'Unauthorized access'});
//         }
        
//         user.bio = bio;
//         user.favArtist = favArtist;
//         user.favAlbum = favAlbum;
//         user.favSong = favSong;

//         const savedUser = await user.save();

//         res.json({ success: true, user: savedUser});

//     } catch (error) {
//         console.error('Error updating user info:', error);
//         res.status(500).json({ error: 'Error updating user info'});
//     }

//   });
//   module.exports = router

