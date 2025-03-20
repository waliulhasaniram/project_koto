import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import {useAuth} from "../../store/productContext"
import { NavLink } from "react-router"

const AdminProdcutUpdate =()=>{
    const {URI, authorizationToken} = useAuth()
    const [allProducts, setAllProducts] = useState()
    const [search, setSearch] = useState('')

////////////////////////////////////////////////////// get all product names

    const adminSeesProducts =async()=>{  
        try {
            const response = await axios.get(`${URI}/a/adminGetProducts`, {
                headers: {Authorization : authorizationToken}
            })

            if(response.status === 200){
                //console.log(response.data.data)
                setAllProducts(response.data.data)
            }
        } catch (error) {
            console.log("admin get product error",error)
        }
    }
    useEffect(()=>{
        adminSeesProducts()
    },[])
/////////////////////////////////////////// edit and delete button handels 
    
    const handleDelete = async(id) => {
      try {
        const deleceProduct = await axios.delete(`${URI}/p/delece-product/${id}`, {
          headers: { Authorization : authorizationToken }
        })
        if(deleceProduct.status === 200){
          toast.success("product delected")
          window.location.reload()
        }
      } catch (error) {
        console.log("product delete error", error)
      }
    };
///////////////////////////////////////////// search function and handel
const getSearchItem = async(searchItem)=>{
    try {
        const response = await axios.get(`${URI}/a/adminSearchProduct?productName=${searchItem}`, {
            headers: {Authorization : authorizationToken}
          })
          if(response.status === 200){
            console.log(response.data.data)
            setAllProducts(response.data.data)
          }
    } catch (error) {
        console.log("search error", error)
    }
}

const handelSearchProduct =async(e)=> {
    e.preventDefault()
    try {
      const value = e.target.value
      //console.log(value)
      setSearch(value)
      getSearchItem(search)
    } catch (error) {
      console.log("search error", error)
    }
  }

    return <Wraper>
       <Searchbar>  
            <div className="Scontainer">
                <div className="search-Scontainer">
                    <input className="input" type="text" placeholder='search' name="search" value={search} onChange={handelSearchProduct}/>
                        <svg viewBox="0 0 24 24" className="search__icon">
                            <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                            </path>
                            </g>
                        </svg>
                </div>
            </div>
        </Searchbar>
        <button className="delete-button" onClick={adminSeesProducts}>Remove filter</button> 
    <div className="table-container">
    <h1>Update product data</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allProducts) && allProducts.map((curElem, index) => {
            return <tr key={index}>
              <td>{curElem.productName}</td>
              <td>{curElem.productType}</td>
              <td>
                <NavLink to={`/admin/edit-product/${curElem._id}`} state={{...curElem}}><button className="edit-button">Edit</button></NavLink> 
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(curElem._id)}>
                  Delete
                </button>
              </td>
            </tr>
            })}
        </tbody>
      </table>
    </div>

    </Wraper>
}

const Wraper = styled.section`
  .table-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  }
  h1 {
    color: black;
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
    margin-top: 5px;
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
const Searchbar = styled.section`
    .Scontainer {
  position: relative;
  background: linear-gradient(135deg, rgb(232, 236, 241) 0%, rgb(181, 213, 252) 100%);
  border-radius: 1000px;
  padding: 10px;
  display: grid;
  place-content: center;
  z-index: 0;
  max-width: 400px;
  margin: 0 10px;
  }

  .search-Scontainer {
    position: relative;
    width: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    padding: 5px;
    display: flex;
    align-items: center;
  }

  .search-Scontainer::after, .search-Scontainer::before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: inherit;
    position: absolute;
  }

  .search-Scontainer::before {
    top: -1px;
    left: -1px;
    background: linear-gradient(0deg, rgb(218, 232, 247) 0%, rgb(255, 255, 255) 100%);
    z-index: -1;
  }

  .search-Scontainer::after {
    bottom: -1px;
    right: -1px;
    background: linear-gradient(0deg, rgb(163, 206, 255) 0%, rgb(211, 232, 255) 100%);
    box-shadow: rgba(79, 156, 232, 0.7019607843) 3px 3px 5px 0px, rgba(79, 156, 232, 0.7019607843) 5px 5px 20px 0px;
    z-index: -2;
  }

  .input {
    padding: 10px;
    width: 100%;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    border: none;
    color: #9EBCD9;
    font-size: 20px;
    border-radius: 50px;
  }

  .input:focus {
    outline: none;
    background: linear-gradient(135deg, rgb(239, 247, 255) 0%, rgb(214, 229, 247) 100%);
  }

  .search__icon {
    width: 50px;
    aspect-ratio: 1;
    border-left: 2px solid white;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-radius: 50%;
    padding-left: 12px;
    margin-right: 10px;
  }

  .search__icon:hover {
    border-left: 3px solid white;
  }

  .search__icon path {
    fill: white;
  }
`
export default AdminProdcutUpdate;