import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../../store/productContext"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminAllUser = () => {
  const {URI, authorizationToken} = useAuth()
  const [userData, setUserData] = useState()

  const getUsers =async()=>{
    try {
      const allusers = await axios.get(`${URI}/a/adminUsers`, {
        headers: { Authorization : authorizationToken }
      })
      if(allusers.status === 200){
        //console.log(allusers.data.data)
        setUserData(allusers.data.data)
      }
    } catch (error) {
      console.log("admin get user error", error)
    }
  }
  useEffect(()=>{
    getUsers()
  },[])
  /////////////////////////////////////////// handels

  const handleDelete = async(id) => {
    try {
      const deleceUser = await axios.delete(`${URI}/u/delete-user/${id}`, {
        headers: { Authorization : authorizationToken }
      })
      if(deleceUser.status === 200){
        toast.success("user delected")
        window.location.reload()
      }
    } catch (error) {
      console.log("user delete error", error)
    }
  };

  return (
    <Wrapper>
        <div className="table-container">
      <h2>User data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>isAdmin</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(userData) && userData.map((user, index) => {
            return <tr key={index}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.isAdmin ? "admin" : "not admin"}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(user._id)}>
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

export default AdminAllUser;