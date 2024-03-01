import { useState } from "react"
import axios from 'axios'

export default function Login(){
    const [data, setData] = useState({
        username: '',
        password:'',

    })

    const loginUser = (e) =>{
    e.preventDefault()
        axios.get('/')
    }

    return(
        <div>
            <form onSubmit = {loginUser}>
                <label>Username</label>
                <input type = 'text'placeholder= 'enter username' value={data.username} onChange={(e) => setData({...data,username:e.target.value})}/>
                <label>Password</label>
                <input type = 'password' placeholder= 'enter password'value={data.password} onChange={(e) => setData({...data,password:e.target.value})}/>
                <button type = 'login'>Login</button>


            </form>
        </div>
    )
}