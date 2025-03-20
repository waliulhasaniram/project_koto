import styled from "styled-components"; 
import { useAuth } from "../store/productContext";
import { useState } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";


const Contact = () => { 
    const navigate = useNavigate()
    const [contactData, setcontactData] = useState({userName:"",email:"",message:""})
    const {URI, authorizationToken, IsLoggedIn, loggedInUser} = useAuth()

    const [userAvailable , setUserAvailable] = useState(true)
    if(userAvailable && loggedInUser){
      setcontactData({userName: loggedInUser.userName, email:loggedInUser.email, message:loggedInUser.message})
      setUserAvailable(false)
    }

    const inputHandeler =(e)=>{
        const name = e.target.name
        const value = e.target.value 
        setcontactData({
            ...contactData,
            [name]:value
        })
    }
    const handelSubmit =async(e)=>{//${URI}/c/post-contact  contactData
        e.preventDefault()
        if(IsLoggedIn){
          try {
              const response = await fetch(`${URI}/c/post-contact`, {
                method: "POST",
                headers: {
                  Authorization : authorizationToken,
                  "Content-Type" : "application/json"
                },
                body: JSON.stringify(contactData)
              })
              const res_data = await response.json()
              if(response.ok){
                    toast.success("successfully sent message")
                    setcontactData({userName:'', email:'', message:''})
              }else{
                    toast.error(res_data.error.extraMessage)
              }   
          } catch (error) {
            toast.error("contact server error")
            console.log("contact server error")
          }
        }else{
          navigate("/login")
          toast.error("login to send message")
        }
        
    }

return ( 
    <Wrapper>
    <Helmet htmlAttributes={{ lang: "en", dir: "ltr" }}>
        <title>koto home page</title>
        <meta name="koto home page" content="Welcome to koto home page! here you can see the latest prices of the grocery items. you can also see the last week and last months prices and price difference between the current prices and older prices. koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents" />
        <meta property="og:title" content="this is koto home page." />
        <meta property="og:description" content="Welcome to koto home page! here you can see the latest prices of the grocery items. you can also see the last week and last months prices and price difference between the current prices and older prices. koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents" />
        <meta name="keywords" content="koto, SEO, grocery items, grocery items prices, grocery items price differents" />
    </Helmet>
    <div>
        
        <h1>Contact us and tell about your thoughts</h1>

        <p>
        Welcome to our website! We’re dedicated to providing exceptional products and services that bring value to our customers. Our team believes in innovation, collaboration, and delivering the highest
        quality in everything we do.
        </p>

        <div className="aboutContent">
            <img
                src="./R.jpeg"
                alt="Company Team"
            />
            <div className="textSection">
                <h2>Our Goal</h2>
                <p>
                Our mission is to empower individuals and organizations with
                reliable solutions that make life easier and more efficient. We
                strive to exceed expectations by focusing on the needs of our
                clients and constantly evolving in a rapidly changing world.
                </p>
                <h2>Our Values</h2>
                <ul>
                <li>Customer First</li>
                <li>Integrity & Transparency</li>
                <li>Innovation & Growth</li>
                <li>Collaboration & Respect</li>
                </ul>
            </div>
        </div>
    </div> 
      <Form>
        <form onSubmit={handelSubmit}>
            <h1>Contact us</h1>
            <div className="input_div">
                <label>Username: </label><br/>
                <input type="userName" name="userName" placeholder="username" id="userName" value={contactData.userName} onChange={inputHandeler} required />
            </div>
            <div className="input_div">
                <label>Email: </label><br/>
                <input type="email" name="email" placeholder="email" id="email" value={contactData.email} onChange={inputHandeler} required />
            </div>
            <div className="input_div">
                <label>message: </label><br/>
                <textarea type="message" name="message" placeholder="message" id="message" value={contactData.message} onChange={inputHandeler} required />
            </div>
            <div className="input_div">
                <button type="submit">Submit</button>
            </div>
        </form>
      </Form>
    </Wrapper> 
    
)}; 
const Wrapper = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
  color: #3d3b3b;
  line-height: 1.6;
  background-color: aliceblue;
  border-radius: 30px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #3d3b3b;
  }

  p {
    margin-bottom: 1.5rem;
  }

  .aboutContent {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
  }

  img {
    max-width: 300px;
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  .textSection {
    flex: 1;
  }

  h2 {
    margin-top: 1rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
  }
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
  }
`;

const Form = styled.section`
    background-color: #c6daf1;
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
    width: 20rem;
    height: 65px;
    font-size: 17px;
    background-color: white ;
    border: 2px solid skyblue;
    border-radius: 8px;
    color: #3a3838;
  }
  h1{
    text-align: center;
    color: #3a3838;
  }
`;
export default Contact