import './register.css';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function Login(){
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password:'',

    })

    const [error, setError] = useState('')

    const loginUser = async(e) =>{
    e.preventDefault()
        const {email,password} = data
        try {
            const {data} = await axios.post('http://localhost:8000/login', {
                email,
                password
            }, {
                withCredentials: true
            });
            if (data.error){
                setError('incorrect username or password')
            }
            else{
                setData({})
                console.log("logged in")
                navigate('/')
            }
        } catch (error) {
            console.error('error', error)
        }
    }

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
             </div>
        </body>
    )
}