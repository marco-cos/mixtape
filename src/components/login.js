import './register.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext';

export default function Login(){
    const navigate = useNavigate();
    const { isLoggedIn, login, logout } = useAuth();
    console.log("isLoggedIn 1: ", isLoggedIn);
    // console.log(sessionStorage.getItem('userId'));

    const [data, setData] = useState({
        email: '',
        password:'',

    })

    const [error, setError] = useState('')

    useEffect(() => {
        console.log("isLoggedIn:", isLoggedIn);
    }, [isLoggedIn]);

    const loginUser = async(e) =>{
        e.preventDefault();
        const {email,password} = data;
        try {
            const result = await axios.post('http://localhost:8000/verifyUser/login', {
                email,
                password
            }, {
                withCredentials: true
            });
            const id  = result.data.userId;
            // console.log("result data: ", result);
            // console.log("result id", id);
            if (result.error){
                setError('incorrect username or password');
            } else {
                login(id);
                setData({});
                navigate('/');
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('userId');
        console.log("logged out");
        navigate('/'); // Redirect to home page after logout
    };

    return(
        <body className="registerpg-body">
            <div class="container">
                <form class="registration-form" onSubmit = {loginUser}>
                    <h1>Login</h1>
                    <div class="form-group">
                        <input className='un' type = 'text'placeholder= 'enter email' value={data.username} onChange={(e) => setData({...data,email:e.target.value})}/>
                    </div>
                    <div class="form-group">
                        <input className='un' type = 'password' placeholder= 'enter password'value={data.password} onChange={(e) => setData({...data,password:e.target.value})}/>
                    </div>
                    <button className="custom-button" type = 'login'>Login</button>
                    {error && <p style = {{color: 'red'}}>{error}</p>}
                </form>
                {isLoggedIn && ( // Conditionally render logout button if logged in
                    <button className="custom-button" onClick={handleLogout}>Logout</button>
                )}
             </div>
        </body>
    )
}