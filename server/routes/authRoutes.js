const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/user')
//const {registerUser} = require('../controllers/authController')


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

// register enpoint
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
        if(!password || password.length < 7){
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

        const user = await User.create({
            username, email, password
        })
        return res.json(user)
    } catch(error){
        console.log(error)
    }
}
)


module.exports = router