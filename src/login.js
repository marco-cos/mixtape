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
        <div>
            <form onSubmit = {loginUser}>
                <label>Username</label>
                <input type = 'text'placeholder= 'enter username' value={data.username} onChange={(e) => setData({...data,username:e.target.value})}/>
                <label>Password</label>
                <input type = 'password' placeholder= 'enter password'value={data.password} onChange={(e) => setData({...data,password:e.target.value})}/>
                <button type = 'login'>Login</button>
                {error && <p style = {{color: 'red'}}>{error}</p>}


            </form>
        </div>
    )
}