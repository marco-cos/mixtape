const User = require('../models/user');

module.exports.getProfile = async (req, res) => {
    // console.log(req);
    const userId = req.params.id;
    // console.log(req.params);
    console.log(userId);
    try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      const { password, ...other } = user._doc;
      res.status(200).json(other);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// module.exports.getProfileById = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id)
//         res.status(200).json({
//             success: true,
//             user,
//         });
//     } catch(error) {
//         console.error(error);
//     }
// }

module.exports.updateProfile = async (req, res, next) => {
    try {
        const { username, bio, favArtist, favSong } = req.body;
        
        const newProfileData = {
            username,
            bio,
            favArtist,
            favSong
        }
        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (userExists && userExists._id.toString() !== req.user._id.toString()){
            return res.json({message:'User already exits'}); 
        }
        await User.findByIdAndUpdate(req.user._id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
        });
        res.status(200).json({
            success: true,
        });
    } catch(error) {
        console.error(error);
    }
}

module.exports.followUser = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
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
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
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
        const user = await User.findById(req.params.userId);
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
