import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../store/productContext';
import { toast } from 'react-toastify';

const Login =()=>{
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({email:"",password:""})
    const {URI, storeAccessToken} = useAuth()

    const inputHandeler =(e)=>{
        const name = e.target.name
        const value = e.target.value 
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
    const handelSubmit =async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`${URI}/u/login`, loginData, 
                {
                    headers: { "Content-Type": "application/json" }
                })
            if(response.status === 200){
                // console.log(response.data.data.accessToken)
                storeAccessToken(response.data.data.accessToken)
                setLoginData({email:"",password:""})
                navigate("/")
                window.location.reload()
                toast.success(response.data.message)
            }else{
                toast.error("invalid email or password")
            }    
        } catch (error) {
            toast.error("may be something is worng! check again")
            throw new Error(`login error: ${error.message}`);
        }
    }

    return <Wraper>
         <div className="reg_container">
            <div className="regForm">
                <form onSubmit={handelSubmit}>
                    <h1>Login Form</h1>

                    <div className="input_div">
                        <label>Email: </label><br/>
                        <input type="email" name="email" placeholder="email" id="email" value={loginData.email} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Password: </label><br/>
                        <input type="password" name="password" placeholder="password" id="password" value={loginData.password} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>   
    </Wraper>
}

const Wraper = styled.section`
    
  .reg_container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 20px;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 30px;
    box-shadow: 0 0 25px rgba(80, 146, 231, 0.8);
  }

  .input_div {
    margin: 20px;
  
  }
  input{
    width: 20rem;
    height: 35px;
    font-size: 17px;
    background-color: white ;
    border: 2px solid skyblue;
    border-radius: 8px;
    color: #3a3838;
  }
  textarea{
    width: 400px;
    height: 100px;
    font-size: 17px; 
  }
  h1{
    text-align: center;
    color: #3a3838;
  }
`
export default Login;