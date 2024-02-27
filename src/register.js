import React from "react";
import { useState } from "react";
import axios from 'axios'

export default function Register(){
    const [userData, setUserData] = useState({
        username: '',
        email:'',
        password:'',

    })

    const registerUser = async (e) =>{
        e.preventDefault()
        const {username, email, password} = userData
        try {
            const {userData} = await axios.post('/register',{
                username, email, password
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <form onSubmit = {registerUser}>
                <label>Username</label>
                <input type = 'text'placeholder= 'enter username' value={userData.username} onChange={(e) => setUserData({...userData,username:e.target.value})}/>
                <label>Email</label>
                <input type = 'email' placeholder= 'enter email'value={userData.email} onChange={(e) => setUserData({...userData,email:e.target.value})}/>
                <label>Password</label>
                <input type = 'password' placeholder= 'enter password'value={userData.password} onChange={(e) => setUserData({...userData,password:e.target.value})}/>
                <button type = 'submit'>Submit</button>


            </form>
        </div>
    )
}