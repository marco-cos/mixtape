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
    console.log(username);
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

module.exports.followUser = async (req, res) => {
  try {
    const username = req.params.targetUser;
    const currUsername = req.body.curr;

    const user = await User.findOne({ username: username});
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const currUser = await User.findOne({ username: currUsername });
    if (!currUser) {
      return res.status(404).json({ success: false, message: "Current user not found" });
    }

    if (!user.followers.includes(currUser._id)) {
      await User.findByIdAndUpdate( 
        user._id,
        { $addToSet: { followers: currUser._id } }
        );
        return res.status(200).json({ success: true, message: "followed!"});
      }
      else {
        return res.status(200).json({ success:true, message: "already following "});
      }
    } catch (error) {
    console.error(error);
  }
}; 

module.exports.addToFollowing = async (req, res) => {
  try {
    const username = req.params.username;
    // console.log(username);
    const currUsername = req.body.username;

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
    return res.status(200).json({ success: true, message: "updated following "});
    } catch (error) {
    console.error(error);
  }
}; 

module.exports.unfollowUser = async (req, res) => {
  try {
    const username = req.params.targetUser;
    console.log(username);
    const currUsername = req.body.username;

    const user = await User.findOne({ username: username});
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const currUser = await User.findOne({ username: currUsername });
    if (!currUser) {
      return res.status(404).json({ success: false, message: "Current user not found" });
    }

    if (user.followers.includes(currUser._id)) {
      await User.findByIdAndUpdate( 
        user._id,
        { $pull: { followers: currUser._id } }
        );
        return res.status(200).json({ success: true, message: "unfollowed!"});
      }
      else {
        return res.status(200).json({ success:true, message: "not following "});
      }
    } catch (error) {
    console.error(error);
  }
}; 

module.exports.removeFollowing = async (req, res) => {
  try {
    const username = req.body.target;
    console.log(username);
    const currUsername = req.body.username;

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
      { $pull: { following: user._id }}
    );
    return res.status(200).json({ success: true, message: "no longer following "});
    } catch (error) {
    console.error(error);
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
    console.log(otherUsername);
    console.log(loggedInUserId);
    const loggedIn = await User.findById(loggedInUserId);
    console.log(loggedIn.username);
    const otherUser = await User.findOne({ username: otherUsername });
    const sameUser = loggedIn._id.equals(otherUser._id);
    console.log(sameUser);
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


