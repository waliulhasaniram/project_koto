import styled from "styled-components";
import { useAuth } from "../../store/productContext";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"

const AdminContacts = () => {
  const {URI, authorizationToken} = useAuth()
  const [contactData, setContactData] = useState()

  const getUsersMessages =async()=>{
    try {
      const response = await axios.get(`${URI}/c/get-all-contacts`, {
        headers: { Authorization : authorizationToken }
      })
      if(response.status === 200){
        //console.log(allusers.data.data)
        setContactData(response.data.data)
      }
    } catch (error) {
      console.log("admin get user error", error)
    }
  }
  useEffect(()=>{
    getUsersMessages()
  },[])
  /////////////////////////////////////////// handels

  const handleDelete = async(id) => {
    try {
      const deleceMsg = await axios.delete(`${URI}/c/delect-contact/${id}`, {
        headers: { Authorization : authorizationToken }
      })
      if(deleceMsg.status === 200){
        toast.success("message delected")
        window.location.reload()
      }
    } catch (error) {
      console.log("message delete error", error)
    }
  };

  return (
    <Wrapper>
                <div className="table-container">
      <h2>All messages from the users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(contactData) && contactData.map((userM, index) => {
            return <tr key={index}>
              <td>{userM.userName}</td>
              <td>{userM.email}</td>
              <td>{userM.message}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(userM._id)}>
                  Delete
                </button>
              </td>
            </tr>
            })}
        </tbody>
      </table>
    </div>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.section`
   .table-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    text-align: left;
  }

  thead tr {
    background-color: #f2f2f2;
  }

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f9f9f9;
  }

  .edit-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
  }

  .edit-button:hover {
    background-color: #45a049;
  }

  .delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: #d32f2f;
  }

  /* Responsive Design */
@media (max-width: 768px) {
  table {
    font-size: 14px;
  }

  th, td {
    padding: 8px;
  }

  thead {
    display: none; /* Hide table header */
  }

  tr {
    display: block;
    margin-bottom: 20px;
  }

  td {
    display: block;
    text-align: start;
    position: relative;
    padding-left: 10px;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 10px;
    font-weight: bold;
    text-align: left;
  }

  .edit-button, .delete-button {
    display: inline-block;
    margin-bottom: 5px;
  }
  }
`;

export default AdminContacts;