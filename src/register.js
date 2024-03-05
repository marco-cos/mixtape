import React from "react";
import './register.css';
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
        <body className="registerpg-body">
            <div class="container">
                <form class="registration-form" onSubmit={registerUser}>
                    <h1>Create your account</h1>
            
                        <div class="form-group">
                            <input className='un' type='text' placeholder='username' value={userData.username} onChange={(e) => setUserData({...userData, username: e.target.value})} />
                        </div>
                        <div class="form-group">
                            <input className='un' type='email' placeholder='email' value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                        </div>
                        <div class="form-group">
                            <input className='un' type='password' placeholder='password less than 7 characters' value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})} />
                        </div>
                        <button className="custom-button" type='submit'>Submit</button>
                </form>
            </div>
        </body>



    )
}
