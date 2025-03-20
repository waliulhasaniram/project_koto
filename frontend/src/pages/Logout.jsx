import { useEffect } from "react";
import { useAuth } from "../store/productContext";
import { Navigate } from "react-router";

const Logout =()=>{
    const {logoutUser} = useAuth()

    useEffect(()=>{
        logoutUser()
    },[logoutUser])
    return  <Navigate to="/login"/>    
}

export default Logout;