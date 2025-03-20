import styled from "styled-components";
import { useAuth } from "../store/productContext";
import { useState } from "react";

const Profile = ({ username, email, phone }) => {
    const {loggedInUser} = useAuth()
    const [profileData, setProfileData] = useState({userName:"",email:"",phone:""})

    const [userAvailable , setUserAvailable] = useState(true)
    if(userAvailable && loggedInUser){
      setProfileData({userName: loggedInUser.userName, email:loggedInUser.email, phone:loggedInUser.phone})
      setUserAvailable(false)
    }
    
  return (
    <Wrapper>
      <h1>Profile</h1>
      <Info>
        <Label>Username:</Label>
        <Value>{profileData.userName}</Value>
      </Info>
      <Info>
        <Label>Email:</Label>
        <Value>{profileData.email}</Value>
      </Info>
      <Info>
        <Label>Phone:</Label>
        <Value>+88-{profileData.phone}</Value>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    font-size: 34px;
    color: #333;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-weight: bold;
  color: #555;
`;

const Value = styled.div`
  color: #777;
@media (max-width: 600px) {
 
    
    h1 {
      font-size: 20px;
    }
 
}
`;


export default Profile;