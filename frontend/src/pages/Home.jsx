import { useState } from 'react';
import { useAuth } from '../store/productContext';
import SellersMode from './SellersMode';
import styled from 'styled-components';
import { GiFruitBowl } from "react-icons/gi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router';
import { FaSortAmountDown } from "react-icons/fa";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { FiSearch } from 'react-icons/fi';
import {Helmet} from "react-helmet-async";

const Home =()=>{
    const {allProductTypes, productDate, getProductData, getSearchedProduct, handleSortChange, sortOrder} = useAuth();

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
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ]
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
                <Searchbar>
                  <IconCircle>
                    <FiSearch className="search-icon" />
                  </IconCircle>
                  <input 
                    className="input" 
                    type="text" 
                    placeholder='Search...' 
                    name="search" 
                    value={search} 
                    onChange={handelSearchProduct}
                  />
                </Searchbar>
            <div>
                <div className="otherComponents">

                    <TypeSlider>
                      <div className="slider-container">
                        <Slider {...settings}>

                          {Array.isArray(allProductTypes) && allProductTypes.map((curElem, index)=> {
                            return <div className="items" key={index}>
                                      <button onClick={() => handleProductType(curElem.productType)}>
                                        <GiFruitBowl className='icon'/>
                                        <span>{curElem.productType}</span>
                                      </button>                            
                                  </div>
                          })}
                        
                        </Slider>
                      </div>
                    </TypeSlider>
                    <button className='clearButton' onClick={()=> getProductData(`${selectedDivision}_division_price`)}><strong>Clear Filter</strong></button>

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

                        
                    <select 
                      className="select-filters" 
                      value={sortOrder} // Add controlled value
                      onChange={(e) => { 
                        // Pass BOTH the division and sort order
                        handleSortChange(e.target.value, selectedDivision);
                      }}
                    >
                      <option value="A-Z">A-Z</option>
                      <option value="Z-A">Z-A</option>
                      <option value="Low-High">Low-High</option>
                      <option value="High-Low">High-Low</option>
                    </select>

                    {/* <SellersMode /> */}
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
                                <img src={porductAvater} alt="" loading='lazy'/>
                                <div className="name_price">
                                  <div>
                                    <h2>{productName}</h2>
                                    <h2>Price: <b>৳</b>{currentMaxPrice}</h2>
                                  </div>
                                    <h2>{currentMaxPrice>lastWeekMaxPrice ? <><FaArrowUpWideShort style={{color:"red"}}/></> : <><FaSortAmountDown style={{color:"green"}}/></>}</h2>
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
    width: 100%;
    background-color: white;
    box-shadow: 0 1px 0px rgba(0, 0, 0, 0.08);
    padding-top: 5px;
    padding-bottom: 5px;
    
  }

  .clearButton {
  background-color: #ff385c; /* Set the background color */
  color: white; /* Ensure the text is readable */
  border: none; /* Remove default borders */
  border-radius: 20px; /* Add rounded corners */
  padding: 10px 20px; /* Adjust the padding for a balanced look */
  cursor: pointer; /* Add a pointer cursor on hover */
  font-size: 16px; /* Set font size */
}

  /* Add hover effect */
  .clearButton:hover {
    background-color: #e3344f; /* Slightly darken on hover */
  }

  @media only screen and (max-width: 600px) {
    .maincontainer{
      width: 96%;
    }
    .clearButton {
      width: 150px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 7px;
    }
  }
  @media only screen and (max-width: 1200px) {
    .maincontainer{
      width: 96%;
    }
    #bottone1 {
      width: 150px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 7px;
    }
  }
  
`
const TypeSlider = styled.section`
    width: 60%;
    max-width: 1000px;
    margin: 20px;
    padding: 15px 0;
    background: white;
    border-radius: 12px;
    /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); */

    .slider-container {
        padding: 0 40px;
    }

    .items {
        padding: 0 8px;
        outline: none;
        
        button {
            background: white;
            width: 110px;
            height: 80px;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 12px;
            border: 1px solid #eeeeee;
            transition: all 0.2s ease;
            cursor: pointer;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .icon {
                font-size: 28px;
                color: #222222;
                margin-bottom: 8px;
            }

            span {
                color: #717171;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
            }
        }
    }

    .slick-prev,
    .slick-next {
        width: 20px;
        height: 35px;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        
        &::before {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            border: 2px solid #222;
            border-width: 2px 2px 0 0;
        }
    }

    .slick-prev {
        left: -18px;
        &::before {
            transform: rotate(-135deg);
            margin-left: 4px;
        }
    }

    .slick-next {
        right: -18px;
        &::before {
            transform: rotate(45deg);
            margin-left: -4px;
        }
    }

    @media (max-width: 768px) {
        width: 95%;
        border-radius: 30px;

        .slider-container {
            padding: 0 20px;
        }

        .items {
            button {
                width: 100px;
                height: 70px;
                
                .icon {
                    font-size: 22px;
                }

                span {
                    font-size: 12px;
                }
            }
        }

        .slick-prev,
        .slick-next {
            display: none !important;
        }
    }

    @media (max-width: 480px) {
        .items {
            button {
                width: 90px;
                height: 60px;
                
                .icon {
                    font-size: 20px;
                    margin-bottom: 4px;
                }

                span {
                    font-size: 11px;
                }
            }
        }
    }
`;

const Searchbar = styled.section`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 40px;
  /* border: 1px solid #dddddd; */
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s ease;
  background-color: white;

  .input {
  width: 100%;
  padding: 14px 20px 14px 52px;
  border: none;
  outline: none;
  font-size: 14px;
  border-radius: 40px;
  border: 1px solid #ccc;
  outline: none;
  background-color: white;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.18);
  }

  &::placeholder {
    color: #000000;
    font-weight: 400;
  }

  &:focus {
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0,0,0,0.18);
    outline: none;
  }

  @media only screen and (max-width: 600px) {
    width: 80%;
    padding: 12px 15px 12px 46px;
    font-size: 13px;
  }
}
`;

const IconCircle = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  background-color: #ff385c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .search-icon {
    color: white;
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 600px) {
    width: 30px;
    height: 30px;
    
    .search-icon {
      font-size: 1rem;
    }
  }
`;

const Filters = styled.section`
  .airbnb-filter {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 30px;
    border: 1px solid #dddddd;
    padding: 8px 16px;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    margin-left: 20px;
  
    &:focus {
      outline: none;
      border-color: #ff385c;
      box-shadow: 0 2px 4px rgba(0,0,0,0.12), 0 0 0 2px rgba(255,56,92,0.2);
    }

    /* Remove default arrow for IE */
    &::-ms-expand {
      display: none;
    }
  }

  .filter-icon {
    color: #222222;
    font-size: 20px;
    margin-right: 12px;
  }

  .select {
    border: none;
    background: transparent;
    appearance: none;
    font-size: 14px;
    font-weight: 500;
    color: #222222;
    padding: 4px 24px 4px 0;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 16px;
    
    &:focus {
      outline: none;
    }
  }

  /* Remove default arrow for IE */
  .select::-ms-expand {
    display: none;
  }

  @media (max-width: 768px) {
    .airbnb-filter {
      padding: 6px 12px;
      margin-left: 12px;
    }
    
    .filter-icon {
      font-size: 18px;
      margin-right: 8px;
    }
    
    .select {
      font-size: 13px;
      background-size: 14px;
    }
  }
`;
// Input styles (add to your existing styles)

export default Home;
