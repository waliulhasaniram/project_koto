import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContaxt = createContext();

const URI = import.meta.env.VITE_MAIN_SERVER_URL //'http://localhost:3000/api'

export const AuthProvider =({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [productDate, setProductData] = useState();
    const [allProductTypes, setallProductTypes] = useState();

    const [searchProduct, setSearchProduct] = useState();

    const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));
    const [loggedInUser, setLoggedInUser] = useState();
    
    const authorizationToken = `Bearer ${accessToken}`;
    const IsLoggedIn = !!accessToken;

    const storeAccessToken =async(storeToken)=> {
        setAccessToken(storeToken)
        return Cookies.set("accessToken", storeToken)
    }

    const getProductData =async(division, productType)=>{
        try {
            setIsLoading(true)
            const allProductData = await 
            axios.get(`${URI}/p/allProducts-byDivision?${division ? `division=${division}` : `division=dhaka_division_price`}${productType ? `&productType=${productType}` : ``}`)
            if(allProductData.status === 200){
                //console.log(allProductData.data.data)
                setProductData(allProductData.data.data)
                setIsLoading(false)
            }
        } catch (error) {
            throw new Error(`get product error: ${error.message}`);
        }
    }

    const getSearchedProduct =async(division, productName)=>{
        try {
            setIsLoading(true)
            const searchProductData = await 
            axios.get(`${URI}/p/searched-product?${division ? `division=${division}` : `division=dhaka_division_price`}${productName ? `&productName=${productName}` : ``}`)
            if(searchProductData.status === 200){
                //console.log(searchProductData.data.data)
                setProductData(searchProductData.data.data)
                setIsLoading(false)
            }
        } catch (error) {
            throw new Error(`get search error: ${error.message}`);
        }
    }

    const getUserData =async()=> {
        try {
            if(IsLoggedIn){
                const response = await axios.get(`${URI}/u/get-user-info`,{
                    headers: {
                        Authorization : authorizationToken
                    }
                })
                if(response.status === 200) {
                    setLoggedInUser(response.data.data)
                    //console.log(response.data.data) 
                }
            }
        } catch (error) {
            throw new Error(`get user data error: ${error.message}`);
        }
    }

    const getProductType =async()=>{
        try {
            const response = await axios.get(`${URI}/p/allproduct-type`)
            if(response.status === 200){
                const dataCatagory = response.data.data                                                //array of objects
                const uniqueCatagorySet = new Set(dataCatagory.map(item=> item.productType))          //unique catagory value (as set)
                const uniqueCatagory = ["All", ...uniqueCatagorySet]                                 // spread operator to convert it to an array  
                const uniqueCatagoryObject = uniqueCatagory.map(productType=> ({productType}))      //converting the array to an object again 
                setallProductTypes(uniqueCatagoryObject)
            }
        } catch (error) {
            throw new Error(`get product type error: ${error.message}`);
        }
    }

    useEffect(()=>{
        getProductData('')
        getUserData()
        getProductType()
        
    },[])

    const logoutUser =async()=>{
        try {
            const response = await fetch(`${URI}/u/logout`,{ 
                method :"POST",
                headers: {
                    Authorization: authorizationToken
                }
            })
            if(response.ok){
                setAccessToken("")
                Cookies.remove("accessToken")
            }
        } catch (error) {
            console.log("logout error", error)
        }
    }

    return <AuthContaxt.Provider value={{productDate, allProductTypes, URI, IsLoggedIn, loggedInUser, authorizationToken, getProductData, storeAccessToken, logoutUser, getSearchedProduct}}>
        {children}</AuthContaxt.Provider>
}

export const useAuth =()=>{
    const contextValue = useContext(AuthContaxt)
    return contextValue
}