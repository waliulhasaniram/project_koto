import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../store/productContext';
import {toast} from "react-toastify"

const Register =()=>{
    const navigate = useNavigate()
    const [regData, setRegData] = useState({userName:"", email:"", password:"", phone:""})
    const {URI} = useAuth()

    const inputHandeler =(e)=>{
        const name = e.target.name 
        const value = e.target.value

        setRegData({
            ...regData,
            [name]: value
        })
    }

    const handelSubmit = async (e) => {//`${URI}/u/register`
        e.preventDefault()
        try {
            const response = await fetch(`${URI}/u/register`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(regData)
            })

            const res_data = await response.json()
            if(response.ok){
                setRegData({userName:'', email:'', password:'', phone:''})
                toast.success('Registration successful')
                navigate('/')
            }else{
                toast.error(res_data.error.extraMessage)
            }      
        } catch (error) {         
            toast.error("server error")  
            throw new Error(`Registration error: ${error.message}`);
        }
    }

   return <Wraper>
        <div className="reg_container">
            <div className="regForm">
            <form onSubmit={handelSubmit}>
                    <h1>Registration Form</h1>
                    <div className="input_div">
                        <label>username: </label><br/>
                        <input type="text" name="userName" placeholder="username" id="userName" value={regData.userName} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Email: </label><br/>
                        <input type="email" name="email" placeholder="email" id="email" value={regData.email} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Password: </label><br/>
                        <input type="password" name="password" placeholder="password" id="password" value={regData.password} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Phone: </label><br/>
                        <input type="number" name="phone" placeholder="phone" id="phone" value={regData.phone} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <button type="submit">Register</button>
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
export default Register;