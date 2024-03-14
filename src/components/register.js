import React from "react";
import './register.css';
import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Register(){
    const navigate = useNavigate()
    const { login, logout } = useAuth();

    var isLoggedIn = localStorage.getItem('isLoggedIn');
  
    const [userData, setUserData] = useState({
        username: '',
        email:'',
        password:'',

    })

    const [error, setError] = useState('')
    

    const registerUser = async (e) =>{
        console.log("isLoggedIn 1: ", isLoggedIn);
        e.preventDefault()
        const {username, email, password} = userData
        try {
            const result = await axios.post('http://localhost:8000/verifyUser/register',{
                username, email, password
            }, {
                withCredentials: true
            });

            const id = result.data.userId;
            console.log("data id: ", id);

            console.log(result.message);
            if (isLoggedIn) {
                console.log("local storage id: ", localStorage.getItem('userId'));
                setError('already logged in')
            }
            else if (result.error) {
                setError('please enter valid email or password')
            }
            else if (result.message === "Email already registered") {
                setError('User with this email already exists');
            }
            else if (result.message === "Username taken") {
                setError('User with this username already exists');
            }
            else if (result.message === "Email address is required" || result.message === "Password is required"){
                setError("All fields are required");
            }
            else {
                // console.log("local storage id: ", localStorage.getItem('userId'));
                setUserData({})
                console.log("navigate");
                navigate('/login')
            }
        } catch (error) {
            console.error('error', error)
        }
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('userId');
        localStorage.removeItem('isLoggedIn');
        console.log("logged out");
        navigate('/'); // Redirect to home page after logout
    };

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
                        {error && <p style = {{color: 'red'}}>{error}</p>}
                </form>
                {isLoggedIn && ( 
                    <button className="custom-button" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </body>



    )
}
