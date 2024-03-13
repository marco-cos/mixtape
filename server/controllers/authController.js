// const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
// const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require("../models/user");



module.exports.Register = async (req, res, next) => {
  try {
    const { email, password, username} = req.body;
    const existingUserEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingUserEmail) {
      return res.json({ message: "Email already registered" });
    }
    else if (existingUsername) {
      return res.json({ message: "Username taken"})
    }
    const user = await User.create({ email, password, username });
    
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'});
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000),
      secure: true,
      withCredentials: true,
      httpOnly: true,
      sameSite: "None",
    });
    console.log("cookie set successfully");
    console.log(user._id);
    res
      .status(201)
      .json({ message: "user created successfully", success: true, token: jwtToken, userId: user._id });
    // req.user = user;
    next();
  } catch (error) { //ensure errors thrown are logged (registering issue username/email issue)
    console.error('Registration error:', error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }

      const jwtToken = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'});
      console.log(user._id);
      res.cookie("token", jwtToken, {
         withCredentials: true,
         httpOnly: true,
       });

    //    req.user = auth;
       res.status(201).json({ message: "User logged in successfully", success: true, token: jwtToken, userId: user._id });
       next()
    } catch (error) {//ensure errors thrown are logged (registering issue username/email issue)
      console.error('Registration error:', error);
      res.status(500).json({ message: 'An error occurred during registration.' });
    }
  }

  module.exports.Signout = async (req, res) => {
    res.clearCookie("token");
    res.json ({
        message: "User has signed out"
    });
  };

  // module.exports.isSignedIn = async (req, res, next) => {
  //   const token = req.cookies.token;
  //   // console.log(token);
  //   if (!token) {
  //       return res.status(401).json({ error: "Unauthorized: No token provided "});
  //   }
  //   try {
  //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //       console.log(decoded.userId);
  //       const user =  await User.findById(decoded.userId);
  //       if (!user) {
  //           return res.status(401).json({ error: 'Unauthorized: Invalid token'});
  //       }
  //       req.user = user;
  //       next();
  //   } catch (error) {
  //       return res.status(401).json({ error: "Unauthorized: Invalid token" });
  //   }
  // };

  // module.exports.isAuthenticated = async (req, res, next) => {
  //   let checker = req.user && req.auth && req.profile._id == req.auth._id;
  //   if (!checker) {
  //       return res.status(403).json({
  //           error: "ACCESS DENIED"
  //       });
  //   }
  //   next();
  // };