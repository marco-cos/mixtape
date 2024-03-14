const User = require('../models/user');
const Review = require('../models/review');


module.exports.getProfileFromId = async (req, res) => {
    const { userId } = req.query;
    console.log(userId);
  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing from the request body' });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const reviews = await Review.find({ reviewer: user._id }).populate("reviewer");
    const { username, favArtist, favSong, favAlbum, followers, following, password, ...other } = user._doc;
    res.status(200).json({ user: { username, favArtist, favSong, favAlbum, followers, following, ...other }, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.getProfileFromUsername = async (req, res) => {
        // console.log(req);
    const username = req.params.username
    // console.log(req.params);
    // console.log(username);
    try {
      const user = await User.findOne({username: username});
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      const reviews = await Review.find({ reviewer: user._id }).populate("reviewer");
      const { password, ...other } = user._doc;
      res.status(200).json({ user: other, reviews });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports.getFollowers = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        const followers = await Promise.all(
            user.following.map((followerId) => {
                return User.findById(followerId);
            })
        ); 
        let followerList = [];
        followers.map((follower) => {
            const { _id, username, profilePicture } = follower;
            followerList.push({ _id, username, profilePicture });
        });
        res.status(200).json(followerList); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

module.exports.followUser = async (req, res) => { //update target user follower count
  try {
    const username = req.params.targetUser;
    // console.log("params", username);
    const currUsername = req.body.username;
    // console.log("logged in user", currUsername);

    const user = await User.findOne({ username: username});
    // console.log(user);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const currUser = await User.findOne({ username: currUsername });
    if (!currUser) {
      return res.status(404).json({ success: false, message: "Current user not found" });
    }
    let isIncluded = false;
    // console.log(user.followers);
    // console.log("length: ", user.followers.length);
    // console.log(user.followers[0]);
    // console.log(user.followers[0]._id);
    // console.log("curr user", currUser._id);
    // if (currUser._id.equals(user.followers[0]._id)) {
    //   console.log("true");
    // }
    for (let i = 0; i < user.followers.length; i++) {
      if (currUser._id.equals(user.followers[i]._id)) {
        isIncluded = true;
        break;
      }
    }
    console.log("isIncluded", isIncluded);
    if (isIncluded === false) {
      console.log("entered false branch");
      const updated = await User.findByIdAndUpdate( 
        user._id,
        { $addToSet: { followers: currUser._id } }
        );
        console.log("followed!");
        return res.status(200).json({ success: true, message: "followed!"});
      }
      else {
        console.log("already following!");
        return res.status(200).json({ success:true, message: "already following "});
      }
    } catch (error) {
    // console.error(error);
  }
}; 

module.exports.addToFollowing = async (req, res) => { //update logged in user following count
  try {
    const username = req.params.username;
    // console.log("params", username);
    const currUsername = req.body.username;
    // console.log("logged in user", currUsername);

    const user = await User.findOne({ username: username});
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const currUser = await User.findOne({ username: currUsername });
    if (!currUser) {
      return res.status(404).json({ success: false, message: "Current user not found" });
    }
    await User.findByIdAndUpdate( 
      currUser._id,
      { $addToSet: { following: user._id }}
    );
    console.log("following updated");
    return res.status(200).json({ success: true, message: "updated following "});
    } catch (error) {
    // console.error(error);
  }
}; 

module.exports.updateProfilePic = async (req, res) => {
  try {
    const username = req.params.username;
    const { pic } = req.body;

    const user = await User.findOne({username: username});
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { profilePic: pic },
      {
        new: true,
        runValidators: true,
        useFindAndModify: true,
      }
    ).exec();
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found', message: 'User not found' });
    }
    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports.checkSameUser = async (req, res, next) => {
  try {
    const { username: otherUsername, loginId: loggedInUserId } = req.params;
    // console.log(otherUsername);
    // console.log(loggedInUserId);
    const loggedIn = await User.findById(loggedInUserId);
    // console.log(loggedIn.username);
    const otherUser = await User.findOne({ username: otherUsername });
    const sameUser = loggedIn._id.equals(otherUser._id);
    // console.log(sameUser);
    res.status(200).json({ sameUser, loggedInUsername: loggedIn.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}

module.exports.updateBio = async (req, res, next) => {
  try {
    const { bio } = req.body;
    const newBio = bio;
    const user = await User.findOne({ username: req.params.username });
    await User.findByIdAndUpdate(user._id, { bio: newBio }, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
    res.status(200).json({
        success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports.updateArtist= async (req, res, next) => {
  try {
    const { artist } = req.body;
    console.log(artist);
    const newArtist = artist;
    const user = await User.findOne({ username: req.params.username });
    await User.findByIdAndUpdate(user._id, { favArtist: newArtist }, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
    res.status(200).json({
        success: true,
        favArtist: user.favArtist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports.updateSong = async (req, res, next) => {
  try {
    const { song } = req.body;
    const newSong = song;
    const user = await User.findOne({ username: req.params.username });
    await User.findByIdAndUpdate(user._id, { favSong: newSong }, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
    res.status(200).json({
        success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports.updateAlbum = async (req, res, next) => {
  try {
    const { album } = req.body;
    const newAlbum = album;
    const user = await User.findOne({ username: req.params.username });
    await User.findByIdAndUpdate(user._id, { favAlbum: newAlbum }, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
    res.status(200).json({
        success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


