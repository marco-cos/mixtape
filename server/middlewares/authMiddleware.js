// const User = require("../models/user");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log("auth " + token)
//     if (!token) {
//       res.json({ status: false });
//     }
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       if (err.name === "TokenExpiredError") {
//         res.status(401).json({ status: false, message: "Access token expired, please sign in again."});
//       } else {
//         throw error;
//       }
//     }
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       res.json({ status: false });
//     }
//     req.user = user; // Attach user to request object for further processing if needed
//     next(); // Call next middleware in the chain
//   } catch (err) {
//     console.error(err);
//   }
// }