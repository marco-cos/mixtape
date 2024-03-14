const express = require('express');
const router = express.Router();
const { getProfileFromId, getProfileFromUsername, checkSameUser, 
    followUser, addToFollowing, getFollowers, updateProfilePic, 
    updateBio, updateArtist, updateSong, updateAlbum
    } = require('../controllers/profileController');

router.route('/').get(getProfileFromId);
router.route('/:username').get(getProfileFromUsername);
router.route('/:username/checkSame/:loginId').get(checkSameUser);

router.route('/:targetUser/follow').put(followUser);
router.route('/:username/add').put(addToFollowing);
router.route('/followers/:username').get(getFollowers);


router.route('/:username/updatePic').put(updateProfilePic);
router.route('/:username/updateBio').put(updateBio);
router.route('/:username/updateArtist').put(updateArtist);
router.route('/:username/updateSong').put(updateSong);
router.route('/:username/updateAlbum').put(updateAlbum);

module.exports = router;
