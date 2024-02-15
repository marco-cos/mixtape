import React from "react";
import { useState } from "react";
import Navbar from "./navbar";

// code for the navbar here

const registerUser = (e) =>{
    e.preventDefault()
}

export default function Register(){
    const [userData, setUserData] = useState({
        name: '',
        email:'',
        password:'',

    })
    return(
        <div>
            <form onSubmit = {registerUser}>
                <label>Username</label>
                <input type = 'text'placeholder= 'enter username' value={userData.name} onChange={(e) => setUserData({...userData,name:e.target.value})}/>
                <label>Email</label>
                <input type = 'email' placeholder= 'enter email'value={userData.email} onChange={(e) => setUserData({...userData,email:e.target.value})}/>
                <label>Password</label>
                <input type = 'password' placeholder= 'enter password'value={userData.password} onChange={(e) => setUserData({...userData,password:e.target.value})}/>
                <button type = 'submit'>Submit</button>


            </form>
        </div>
    )
}