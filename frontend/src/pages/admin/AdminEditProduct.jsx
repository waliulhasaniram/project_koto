import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import styled from "styled-components"
import { useAuth } from "../../store/productContext";
import mongoose from "mongoose";

const AdminEditProduct = () => {
  const {URI, authorizationToken} = useAuth() 
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allPrice, setAllPrice] = useState({});
  
  // Define division structure template
  const divisionTemplate = {
      currentMinPrice: '',
      currentMaxPrice: '',
      lastWeekMinPrice: '',
      lastWeekMaxPrice: '',
      lastMonthMinPrice: '',
      lastMonthMaxPrice: '',
      lastYearPrice: ''
  };

  // Initialize state when component mounts
  useEffect(() => {
      if (location.state?.price) {
          const initialPrice = {
              dhaka_division_price: { ...divisionTemplate, ...location.state.price.dhaka_division_price },
              rajshahi_division_price: { ...divisionTemplate, ...location.state.price.rajshahi_division_price },
              khulna_division_price: { ...divisionTemplate, ...location.state.price.khulna_division_price },
              barishal_division_price: { ...divisionTemplate, ...location.state.price.barishal_division_price },
              chottogram_division_price: { ...divisionTemplate, ...location.state.price.chottogram_division_price },
              sylhet_division_price: { ...divisionTemplate, ...location.state.price.sylhet_division_price },
              mymensingh_division_price: { ...divisionTemplate, ...location.state.price.mymensingh_division_price },
              rangpur_division_price: { ...divisionTemplate, ...location.state.price.rangpur_division_price }
          };
          setAllPrice(initialPrice);
      }
  }, [location.state]);

  const handleInputChange = (division, field, value) => {
      setAllPrice(prev => ({
          ...prev,
          [division]: {
              ...prev[division],
              [field]: value
          }
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Ensure price data has the correct structure
      const formattedPrice = Object.entries(allPrice).reduce((acc, [divisionKey, divisionData]) => {
        acc[divisionKey] = {
          currentMinPrice: Number(divisionData.currentMinPrice),
          currentMaxPrice: Number(divisionData.currentMaxPrice),
          lastWeekMinPrice: divisionData.lastWeekMinPrice ? Number(divisionData.lastWeekMinPrice) : undefined,
          lastWeekMaxPrice: divisionData.lastWeekMaxPrice ? Number(divisionData.lastWeekMaxPrice) : undefined,
          lastMonthMinPrice: divisionData.lastMonthMinPrice ? Number(divisionData.lastMonthMinPrice) : undefined,
          lastMonthMaxPrice: divisionData.lastMonthMaxPrice ? Number(divisionData.lastMonthMaxPrice) : undefined,
          lastYearPrice: divisionData.lastYearPrice ? Number(divisionData.lastYearPrice) : undefined
        };
        return acc;
      }, {});
  
      const response = await axios.patch(
        `${URI}/a/update-price/${location.state._id}`, 
        { price: formattedPrice }, // Send formatted data
        {
          headers: { 
            Authorization: authorizationToken,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if(response.status === 200){
        // Optional: Handle success
      }
      
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!location.state || !Object.keys(allPrice).length) {
      return <div>Loading product data...</div>;
  }

  return (
      <Wraper>
          <div className="product-form">
              <h2>Edit product price</h2>
              <form onSubmit={handleSubmit}>
                  <h3>Product Name: {location.state.productName}</h3>
                  <h3>Product Type: {location.state.productType}</h3>

                  {Object.entries(allPrice).map(([division, priceData]) => (
                      <div key={division} className="division-section">
                          <h3>
                              {division.replace(/_/g, ' ')
                                        .replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          
                          <div className="input_div">
                              <label>Current Min Price:</label> 
                              <input
                                  type="number"
                                  placeholder="Current Min Price"
                                  value={priceData.currentMinPrice}
                                  onChange={(e) => handleInputChange(division, 'currentMinPrice', e.target.value)}
                              />

                              <label>Current Max Price:</label>  
                              <input
                                  type="number"
                                  placeholder="Current Max Price"
                                  value={priceData.currentMaxPrice}
                                  onChange={(e) => handleInputChange(division, 'currentMaxPrice', e.target.value)}
                              />
                          </div>

                          <div className="input_div">
                          <label>Last Week Min Price:</label>
                              <input
                                  type="number"
                                  placeholder="Last Week Min Price"
                                  value={priceData.lastWeekMinPrice}
                                  onChange={(e) => handleInputChange(division, 'lastWeekMinPrice', e.target.value)}
                              />

                              <label>Last Week Max Price:</label>
                              <input
                                  type="number"
                                  placeholder="Last Week Max Price"
                                  value={priceData.lastWeekMaxPrice}
                                  onChange={(e) => handleInputChange(division, 'lastWeekMaxPrice', e.target.value)}
                              />
                          </div>

                          <div className="input_div">
                              <label>Last Month Min Price:</label>
                              <input
                                  type="number"
                                  placeholder="Last Month Min Price"
                                  value={priceData.lastMonthMinPrice}
                                  onChange={(e) => handleInputChange(division, 'lastMonthMinPrice', e.target.value)}
                              />

                              <label>Last Month Max Price:</label>
                              <input
                                  type="number"
                                  placeholder="Last Month Max Price"
                                  value={priceData.lastMonthMaxPrice}
                                  onChange={(e) => handleInputChange(division, 'lastMonthMaxPrice', e.target.value)}
                              />
                          </div>

                          <div className="input_div">
                              <label>Last Year Price:</label>
                              <input
                                  type="number"
                                  placeholder="Last Year Price"
                                  value={priceData.lastYearPrice}
                                  onChange={(e) => handleInputChange(division, 'lastYearPrice', e.target.value)}
                              />
                          </div>
                      </div>
                  ))}

                  {error && <div className="error-message">{error}</div>}
                  
                  <button type="submit" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Prices'}
                  </button>
              </form>
          </div>
      </Wraper>
  );
};

const Wraper = styled.section`
      display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-section {
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
    margin: 5px;
  }
  h1{
    text-align: center;
    color: #3a3838;
  }
`
export default AdminEditProduct;