import './register.css';
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password:'',

    })

    const [error, setError] = useState('')

    const loginUser = async(e) =>{
    e.preventDefault()
        //axios.get('/')
        const {username,password} = data
        try {
            const {data} = await axios.post('/login', {
                username,
                password
            });
            if (data.error){
                setError('incorrect username or password')
            }
            else{
                setData({})
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
                        <input className='un' type = 'text'placeholder= 'enter username' value={data.username} onChange={(e) => setData({...data,username:e.target.value})}/>
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