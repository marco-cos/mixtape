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
    const { username, password, ...other } = user._doc;
    res.status(200).json({ user: { username, ...other }, reviews });
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
      const user = await User.findOne(username);
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

module.exports.followUser = async (req, res, next) => {
    const targetUsername = req.params.targetUser;
    const currentUsername = req.body.username;
    if (targetUsername !== currentUsername) {
    try {
      const user = await User.findOne({ username: targetUsername });
      const currentUser = await User.findOne({ username: currentUsername });
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: targetUser._id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
}

module.exports.unfollowUser = async (req, res, next) => {
    const targetUsername = req.params.targetUser;
    const currentUsername = req.body.username;
    if (targetUsername !== currentUsername) {
        try {
          const user = await User.findOne({ username: targetUsername });
          const currentUser = await User.findOne({ username: currentUsername })
          if (user.followers.includes(currentUser._id)) {
            await user.updateOne({ $pull: { followers: currentUser._id } });
            await currentUser.updateOne({ $pull: { followings: user._id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
}

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
    const { loggedInUserId } = req.body;
    const { otherUsername } = req.params.username;
    const loggedIn = await User.findById(loggedInUserId);
    const otherUser = await User.findOne({ username: otherUsername });
    const sameUser = loggedIn._id.equals(otherUser._id);
    res.status(200).json({ sameUser, loggedInUsername: loggedIn.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}