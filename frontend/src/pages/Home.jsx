import { useState } from 'react';
import { useAuth } from '../store/productContext';
import SellersMode from './SellersMode';
import styled from 'styled-components';
import { GiFruitBowl } from "react-icons/gi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router';
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import {Helmet} from "react-helmet-async";

const Home =()=>{
    const {allProductTypes, productDate, getProductData, getSearchedProduct} = useAuth();

    const [selectedDivision, setSelectedDivision] = useState(localStorage.getItem("division") || 'dhaka');
    const [selectedProductType, setSelectedProductType] = useState("All");

    const [search, setSearch] = useState('')

    const storeDivision=(division)=>{ // select division and set in localstorage
      setSelectedDivision(division)
      return localStorage.setItem("division", division)
    }

/////////////////////////////////////////////// product type slider handeler

    const handleProductType = (type) => {
      setSelectedProductType(type);
      
      // If "All", skip productType filter. Otherwise pass the chosen type.
      if (type === "All") {
        getProductData(`${selectedDivision}_division_price`);
      } else {
        getProductData(`${selectedDivision}_division_price`, type);
      }
    };

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 2
    };

///////////////////////------------////------------////////////////// search product

  const handelSearchProduct =async(e)=> {
    e.preventDefault()
    try {
      const value = e.target.value
      console.log(value)
      setSearch(value)
      getSearchedProduct(`${selectedDivision}_division_price`, search)
    } catch (error) {
      console.log("search error", error)
    }
  }

    return <Wraper>
        <Helmet htmlAttributes={{ lang: "en", dir: "ltr" }}>
            <title>koto home page</title>
            <meta name="koto home page" content="Welcome to koto home page! here you can see the latest prices of the grocery items. you can also see the last week and last months prices and price difference between the current prices and older prices. You can see the prices for each division. koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents" />
            <meta property="og:title" content="this is koto home page." />
            <meta property="og:description" content="Welcome to koto home page! here you can see the latest prices of the grocery items. you can also see the last week and last months prices and price difference between the current prices and older prices. koto, SEO, grocery items, grocery items prices, vegetable s prices, grocery items price differents" />
            <meta name="keywords" content="koto, SEO, grocery items, grocery items prices, grocery items price differents" />
        </Helmet>

        <div className='maincontainer'>
            <div>
                <div className="search_div">
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
                    
                    <select className="select" value={selectedDivision} onChange={(e) => { //// select for division
                      storeDivision(e.target.value); 
                      getProductData(`${e.target.value}_division_price`);
                      selectedProductType === "All" ? undefined : selectedProductType } }>

                        <option value="dhaka">Dhaka</option>
                        <option value="rajshahi">Rajshahi</option>
                        <option value="khulna">Khulna</option>
                        <option value="barishal">Barishal</option>
                        <option value="chottogram">Chottogram</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="mymensingh">Mymensingh</option>
                        <option value="rangpur">Rangpur</option>
                    </select>
                </div>
                

                <div className="otherComponents">

                    <TypeSlider>
                      <div className="slider-container">
                        <Slider {...settings}>

                          {Array.isArray(allProductTypes) && allProductTypes.map((curElem, index)=> {
                            return <div className="items" key={index}>
                             
                              <button onClick={()=> handleProductType(curElem.productType)}> <GiFruitBowl className='icon'/>{curElem.productType}</button>
                            </div>
                          })}
                        
                        </Slider>
                      </div>
                    </TypeSlider>
                    <button id="bottone1" onClick={()=> getProductData(`${selectedDivision}_division_price`)}><strong>Clear Filter</strong></button>

                    <SellersMode />
                </div>
            </div> 
        </div>

        <div className="product_container">
            {Array.isArray(productDate) && productDate.map((curElem, index) => {
                const {productName, productType, price, porductAvater} = curElem
                
                const divisonKey = `${selectedDivision}_division_price`

                const currentMaxPrice = price?.[divisonKey]?.currentMaxPrice || 'price will be available'
                const lastWeekMaxPrice = price?.[divisonKey]?.lastWeekMaxPrice || 'price will be available'

                return <div key={index}>
                          <NavLink to={`/${curElem._id}`} state={{...curElem}}>
                            <div className="card">
                                <img src={porductAvater} alt=""/>
                                <div className="name_price">
                                    <h2>{productName}</h2>
                                    <h2><b>৳</b>{currentMaxPrice}</h2>
                                    <h2>{currentMaxPrice>lastWeekMaxPrice ? <><FaLongArrowAltUp style={{color:"red"}}/></> : <><FaLongArrowAltDown style={{color:"green"}}/></>}</h2>
                                </div>
                            </div>    
                          </NavLink>
                </div>
            })}
        </div>
    </Wraper>
}

const Wraper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .maincontainer{
    width: 80%;
    background-image: linear-gradient(to right, #cee0f0, #f4f4f5, #b7cbec);
    box-shadow: 0 2px 0px rgb(40, 164, 236);
    padding-top: 60px;
    padding-bottom: 20px;
    border-radius: 0px 0px 40px 40px
  }

  #bottone1 {
  padding-left: 33px;
  padding-right: 33px;
  padding-bottom: 16px;
  padding-top: 16px;
  border-radius: 9px;
  background-image: linear-gradient(to right, #3792e7, #3cb4fa);
  border: none;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  transition: 0.4s;
  }

  #bottone1:hover {
  box-shadow: 7px 5px 56px -14px #0079be;
  }

  #bottone1:active {
  transform: scale(0.97);
  box-shadow: 7px 5px 56px -10px #0a8fc4;
  }

  @media only screen and (max-width: 600px) {
    .maincontainer{
      width: 100%;
    }
  }
  
`
const TypeSlider = styled.section`
    width: 500px;
    padding: 10px;
    margin-top: 30px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgb(232, 236, 241) 0%, rgb(181, 213, 252) 100%);
    border: 3px #a1cff5 solid;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    margin-bottom: 30px;
    .items{
      width: 300px;
      border-radius: 20px;
      button{
            background-color: #fff;
            color: #6d6a6a;
            width: 150px;
            height: 50px;
            border-radius: 15x;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon{
              font-size: 23px;
              margin-right: 7px;
            }
        }
    }
    .slick-prev:before {
    content: '←';
    font-size: x-large;
    }
    .slick-next:before {
    content: '→';
    font-size: x-large;
    }
  @media only screen and (max-width: 600px) {
    width: 350px;
  }   

`
const Searchbar = styled.section`
  .Scontainer {
  position: relative;
  background: linear-gradient(135deg, rgb(232, 236, 241) 0%, rgb(181, 213, 252) 100%);
  border-radius: 20px;
  padding: 10px;
  display: grid;
  place-content: center;
  z-index: 0;
  max-width: 600px;
  margin: 0 10px;
  }

  .search-Scontainer {
    position: relative;
    width: 550px;
    border-radius: 15px;
    background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
    padding: 5px;
    display: flex;
    align-items: center;
  }

  .search-Scontainer::after, .search-Scontainer::before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 20px;
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

  @media only screen and (max-width: 600px) {
    .Scontainer{
      max-width: 200px;
    }
    .search-Scontainer{
      width: 200px;
    }
  }

`

export default Home;