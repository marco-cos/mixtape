const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/user')
//const {registerUser} = require('../controllers/authController')
const jwt = require('jsonwebtoken');


// middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', (req,res) => {
    res.json('test works')
    }
)

// register endpoint
router.post('/register', async (req,res) => {
    try{
        const{username, email, password} = req.body
        // check usernmae was inputted
        if(!username){
            return res.json({
                error: 'username is required'
            })
        }

        // check if password was inputted
        if(!password || password.length > 6){
            return res.json({
                error: 'password is required and must be less than 7 characters'
            })
        }

        // check email validity
        const exist = await User.findOne({email});
        if (exist){
            return res.json({
                error: 'email is taken'
            })
        }

        // create user in database
        const user = await User.create({
            username,
            email, 
            password,
        })
        return res.json(user)
    } catch(error){
        console.log(error)
    }
}
)

// login endpoint

router.post('/login', async (req,res) => {
    try {
        const {username, password} = req.body;

        // check if user exist and if password matches

        const passMatch = await User.findOne({username, password});
        if (passMatch){
            res.json('password correct')

            // JSON web token to create session cookies for each user to track their data after logging in
            jwt.sign({email: passMatch.email, id: passMatch._id, username: passMatch.username}, process.env.JWT_SECRET, {}, (err,token)=> {
                if(err) throw err;
                res.cookie('token', token).json(passMatch)
            })
        }
        if (!passMatch){
            return res.json({
                error: 'incorrect password'
            })
        }
    } catch (error) {
        console.log(error)
    }
}
)

module.exports = router